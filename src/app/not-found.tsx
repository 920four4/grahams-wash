import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
      <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy">Page not found</h1>
      <p className="mt-4 text-muted">
        That link doesn’t exist on the new Graham&apos;s Wash site. Head home, browse services, or request a quote.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Go home</Button>
        <Button href="/services" variant="outline">
          See services
        </Button>
        <Button href="/contact" variant="outline">
          Request a quote
        </Button>
      </div>
      <p className="mt-8 text-sm text-muted">
        Looking for holiday lights? They’re now at{" "}
        <Link href="/services/permanent-christmas-lights" className="font-semibold text-brand hover:underline">
          /services/permanent-christmas-lights
        </Link>
        .
      </p>
    </div>
  );
}
