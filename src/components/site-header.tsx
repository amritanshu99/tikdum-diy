"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/artworks", label: "Artworks" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement">
        <span aria-hidden="true">✦</span>
        <p>Original art · Studio stories · Made slowly in India</p>
        <span aria-hidden="true">✦</span>
      </div>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="Tikdum DIY home">
          <span>Tikdum DIY</span>
          <small>Art · Craft · Stories</small>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/artworks" className="header-cta">
          Explore <span aria-hidden="true">↗︎</span>
        </Link>
      </header>
    </>
  );
}
