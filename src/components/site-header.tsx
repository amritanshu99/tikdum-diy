import Link from "next/link";

const navigation = [
  { href: "/artworks", label: "Artworks" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement">
        <p>An independent space for art, process, and thoughtful making.</p>
      </div>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="TikDum home">
          <span>TikDum</span>
          <small>Art · Process · Home</small>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/artworks" className="header-cta">
          Explore <span aria-hidden="true">↗</span>
        </Link>
      </header>
    </>
  );
}
