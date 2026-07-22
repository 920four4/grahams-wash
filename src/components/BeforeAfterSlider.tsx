"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronsLeftRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  aspectClass?: string;
  /** Divider start position 0–100 (left = more before). */
  initialPosition?: number;
  /** One-shot wipe when first scrolled into view (no continuous loop). */
  autoPlayOnView?: boolean;
  priority?: boolean;
  sizes?: string;
  rounded?: string;
  showHint?: boolean;
};

/**
 * High-performance before/after slider.
 * Position is applied via DOM refs during drag/animation — never React setState per frame.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before cleaning",
  afterAlt = "After cleaning",
  className,
  aspectClass = "aspect-[4/3]",
  initialPosition = 52,
  autoPlayOnView = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 800px",
  rounded = "rounded-[1.5rem] sm:rounded-[2rem]",
  showHint = true,
}: Props) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const beforeLabelRef = useRef<HTMLSpanElement>(null);
  const afterLabelRef = useRef<HTMLSpanElement>(null);
  const positionRef = useRef(initialPosition);
  const draggingRef = useRef(false);
  const interactedRef = useRef(false);
  const introPlayedRef = useRef(false);
  const rafRef = useRef(0);

  const [dragging, setDragging] = useState(false);
  const [showHintUi, setShowHintUi] = useState(showHint);
  const [mounted, setMounted] = useState(priority); // skip heavy work until visible

  const applyPosition = useCallback((raw: number) => {
    const pct = Math.min(96, Math.max(4, raw));
    positionRef.current = pct;
    const before = beforeLayerRef.current;
    const line = lineRef.current;
    const handle = handleRef.current;
    if (before) before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    if (line) line.style.transform = `translate3d(calc(${pct}% - 1.5px), 0, 0)`;
    if (handle) handle.style.transform = `translate3d(calc(${pct}% - 50%), -50%, 0)`;
    if (beforeLabelRef.current) {
      beforeLabelRef.current.style.opacity = pct > 14 ? "1" : "0";
    }
    if (afterLabelRef.current) {
      afterLabelRef.current.style.opacity = pct < 86 ? "1" : "0";
    }
    if (handle) handle.setAttribute("aria-valuenow", String(Math.round(pct)));
  }, []);

  // Mount only when near viewport (saves image decode + observers)
  useEffect(() => {
    if (priority) {
      setMounted(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority]);

  // Apply initial position once mounted
  useEffect(() => {
    if (!mounted) return;
    applyPosition(autoPlayOnView ? 12 : initialPosition);
  }, [mounted, autoPlayOnView, initialPosition, applyPosition]);

  // One-shot intro animation — DOM only, cancelled when out of view
  useEffect(() => {
    if (!mounted || !autoPlayOnView || introPlayedRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || introPlayedRef.current || interactedRef.current) return;
        introPlayedRef.current = true;
        io.disconnect();

        const from = 12;
        const to = initialPosition;
        const duration = 1100;
        const start = performance.now();

        const tick = (now: number) => {
          if (cancelled || interactedRef.current) return;
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) * (1 - t) * (1 - t);
          applyPosition(from + (to - from) * eased);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, autoPlayOnView, initialPosition, applyPosition]);

  // Pause work when tab is hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      applyPosition(((clientX - rect.left) / rect.width) * 100);
    },
    [applyPosition],
  );

  const markInteract = () => {
    if (!interactedRef.current) {
      interactedRef.current = true;
      cancelAnimationFrame(rafRef.current);
      setShowHintUi(false);
    }
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    setDragging(true);
    markInteract();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    draggingRef.current = false;
    setDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      markInteract();
      const delta = e.key === "ArrowLeft" ? -5 : 5;
      applyPosition(positionRef.current + delta);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative select-none overflow-hidden bg-navy/10 shadow-xl shadow-navy/10 ring-1 ring-black/5",
        aspectClass,
        rounded,
        className,
      )}
      onPointerDown={mounted ? onPointerDown : undefined}
      onPointerMove={mounted ? onPointerMove : undefined}
      onPointerUp={mounted ? onPointerUp : undefined}
      onPointerCancel={mounted ? onPointerUp : undefined}
      style={{
        touchAction: "none",
        cursor: dragging ? "grabbing" : "ew-resize",
        contain: "layout paint",
      }}
      role="img"
      aria-label="Before and after comparison. Drag to reveal the cleaned result."
    >
      {!mounted ? (
        // Lightweight placeholder until near viewport
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy/10 to-brand/10" />
      ) : (
        <>
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            priority={priority}
            sizes={sizes}
            quality={75}
            className="object-cover"
            draggable={false}
          />

          <div
            ref={beforeLayerRef}
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: `inset(0 ${100 - initialPosition}% 0 0)` }}
          >
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              priority={priority}
              sizes={sizes}
              quality={75}
              className="object-cover"
              draggable={false}
            />
          </div>

          <span
            ref={beforeLabelRef}
            className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md sm:left-4 sm:top-4"
            style={{ opacity: initialPosition > 14 ? 1 : 0, transition: "opacity 120ms linear" }}
          >
            Before
          </span>
          <span
            ref={afterLabelRef}
            className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md sm:right-4 sm:top-4"
            style={{ opacity: initialPosition < 86 ? 1 : 0, transition: "opacity 120ms linear" }}
          >
            After
          </span>

          <div
            ref={lineRef}
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[3px] bg-white will-change-transform"
            style={{
              transform: `translate3d(calc(${initialPosition}% - 1.5px), 0, 0)`,
              boxShadow: "0 0 12px rgba(255,255,255,0.45)",
            }}
          />

          <button
            type="button"
            ref={handleRef}
            id={id}
            aria-label="Drag to compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(initialPosition)}
            role="slider"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={cn(
              "absolute left-0 top-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-white text-navy shadow-lg outline-none will-change-transform focus-visible:ring-4 focus-visible:ring-brand/40 sm:h-14 sm:w-14",
              dragging && "scale-105",
            )}
            style={{ transform: `translate3d(calc(${initialPosition}% - 50%), -50%, 0)` }}
            onPointerDown={onPointerDown}
          >
            <ChevronsLeftRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.4} />
          </button>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy/25 to-transparent"
            aria-hidden
          />

          {showHintUi && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center sm:bottom-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-navy shadow-lg">
                <GripVertical className="h-3.5 w-3.5 text-brand" />
                Drag to reveal after
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
