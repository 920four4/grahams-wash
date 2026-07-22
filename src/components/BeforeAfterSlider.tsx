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
  /** 0–100: how much of the AFTER is revealed from the right. Position of divider. */
  initialPosition?: number;
  autoPlayOnView?: boolean;
  idleAnimate?: boolean;
  priority?: boolean;
  sizes?: string;
  rounded?: string;
  showHint?: boolean;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before cleaning",
  afterAlt = "After cleaning",
  className,
  aspectClass = "aspect-[4/3]",
  initialPosition = 52,
  autoPlayOnView = true,
  idleAnimate = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 800px",
  rounded = "rounded-[1.5rem] sm:rounded-[2rem]",
  showHint = true,
}: Props) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(autoPlayOnView ? 12 : initialPosition);
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hintVisible, setHintVisible] = useState(showHint);
  const [inView, setInView] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, pct)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Intro: wipe from left (before) toward center to reveal after
  useEffect(() => {
    if (!autoPlayOnView || !inView || hasInteracted) return;
    let raf = 0;
    const start = performance.now();
    const from = 10;
    const to = initialPosition;
    const duration = 1600;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPosition(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoPlayOnView, inView, hasInteracted, initialPosition]);

  useEffect(() => {
    if (!idleAnimate || !inView || hasInteracted || dragging) return;
    let raf = 0;
    const base = initialPosition;
    const amp = 5;
    const start = performance.now();
    const timeout = window.setTimeout(() => {
      const loop = (now: number) => {
        const t = (now - start) / 1000;
        setPosition(base + Math.sin(t * 0.65) * amp);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }, 2000);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [idleAnimate, inView, hasInteracted, dragging, initialPosition]);

  const markInteract = () => {
    setHasInteracted(true);
    setHintVisible(false);
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    setDragging(true);
    markInteract();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = (e: ReactPointerEvent) => {
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
      setPosition((p) => {
        const delta = e.key === "ArrowLeft" ? -5 : 5;
        return Math.min(96, Math.max(4, p + delta));
      });
    }
  };

  // position = width of BEFORE (left). After shows on the right.
  const beforeClip = `inset(0 ${100 - position}% 0 0)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative select-none overflow-hidden bg-navy/10 shadow-2xl shadow-navy/20 ring-1 ring-black/5",
        aspectClass,
        rounded,
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ touchAction: "none", cursor: dragging ? "grabbing" : "ew-resize" }}
      role="img"
      aria-label="Before and after comparison. Drag to reveal the cleaned result."
    >
      {/* AFTER layer (full) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        draggable={false}
      />

      {/* Subtle shine on after */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          backgroundPosition: `${position}% 0`,
        }}
        aria-hidden
      />

      {/* BEFORE layer (clipped to left) */}
      <div className="absolute inset-0" style={{ clipPath: beforeClip }}>
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          draggable={false}
        />
        {/* slight desat for "before" mood */}
        <div className="pointer-events-none absolute inset-0 bg-navy/10 mix-blend-multiply" aria-hidden />
      </div>

      {/* Labels */}
      <span
        className={cn(
          "pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition-opacity duration-200 sm:left-4 sm:top-4",
          position > 14 ? "opacity-100" : "opacity-0",
        )}
      >
        Before
      </span>
      <span
        className={cn(
          "pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition-opacity duration-200 sm:right-4 sm:top-4",
          position < 86 ? "opacity-100" : "opacity-0",
        )}
      >
        After
      </span>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-[3px] bg-white shadow-[0_0_24px_rgba(255,255,255,0.7)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <button
        type="button"
        id={id}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        role="slider"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn(
          "absolute top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-white text-navy shadow-[0_8px_30px_rgba(0,0,0,0.25)] outline-none transition-transform focus-visible:ring-4 focus-visible:ring-brand/40 sm:h-14 sm:w-14",
          dragging ? "scale-110" : "group-hover:scale-105",
        )}
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
      >
        <ChevronsLeftRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.4} />
      </button>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/30 to-transparent"
        aria-hidden
      />

      {hintVisible && !hasInteracted && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center sm:bottom-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-navy shadow-xl animate-[pulse_2s_ease-in-out_infinite]">
            <GripVertical className="h-3.5 w-3.5 text-brand" />
            Drag to reveal after
          </span>
        </div>
      )}
    </div>
  );
}
