import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <div>
          <p className="eyebrow eyebrow--light">Tikdum DIY · India</p>
          <p className="site-footer__note">
            Original art, joyful craft, and field notes from an evolving studio
            practice.
          </p>
        </div>
        <p className="site-footer__statement">
          Art for the rooms we live in and the lives we make there.
        </p>
      </div>
      <p className="site-footer__wordmark" aria-hidden="true">
        Tikdum DIY
      </p>
      <div className="site-footer__bottom">
        <Link href="/" className="footer-mark" aria-label="Tikdum DIY home">
          T
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/artworks">Artworks</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="site-footer__meta">
          <span>www.tikdumdiy.com</span>
          <span>© {new Date().getFullYear()} Tikdum DIY</span>
        </div>
        <a
          className="site-footer__credit"
          href="https://www.amiverse.in"
          target="_blank"
          rel="noreferrer"
          aria-label="Made with love by Amiverse (opens in a new tab)"
        >
          <span>Made with</span>
          <span className="site-footer__heart" aria-hidden="true">
            ♥
          </span>
          <span>by Amiverse</span>
          <span className="site-footer__credit-arrow" aria-hidden="true">
            ↗︎
          </span>
        </a>
      </div>
    </footer>
  );
}
