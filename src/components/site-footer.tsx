import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <p className="eyebrow eyebrow--light">TikDum · India</p>
        <p className="site-footer__statement">
          Art for the rooms we live in and the lives we make there.
        </p>
      </div>
      <div className="site-footer__bottom">
        <Link href="/" className="footer-mark">
          T
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/artworks">Artworks</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="site-footer__meta">
          <span>www.tikdumdiy.com</span>
          <span>© {new Date().getFullYear()} TikDum</span>
        </div>
      </div>
    </footer>
  );
}
