import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <h1>404</h1>
        <p>This page has wandered out of the studio.</p>
        <Link href="/" className="button button--dark">
          Return home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
