"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./gallery.css";
import Image from "next/image";

const TABS = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "messages",
    label: "Messages",
    href: "/message",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "gallery",
    label: "Gallery",
    href: "/gallery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 16.5 9 12l3 2.5 4-4 4 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

/**
 * ── HARDCODED GALLERY DATA ──
 * This is the single source of truth for what shows up on the page.
 * To add a memory: drop the image file in /public/gallery/ and add
 * a new object below. `rotate` gives each polaroid its slight
 * scrapbook tilt — keep it between -6 and 6 for a natural look.
 */
const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/photo-1.png",
    caption: "Flower ♡ | 28.06.2026",
    rotate: -4,
  },
];

function PolaroidCard({ item, onOpen }) {
  return (
    <button
      type="button"
      className="polaroid-card"
      style={{ "--rotate": `${item.rotate}deg` }}
      onClick={() => onOpen(item)}
      aria-label={`Open photo: ${item.caption}`}
    >
      <span className="polaroid-tape" aria-hidden="true" />
      <span className="polaroid-photo">
        <Image
            src={item.src}
            alt={item.caption}
            width={400}
            height={400}
            className="gallery-image"
          />
      </span>
      <span className="polaroid-caption">{item.caption}</span>
    </button>
  );
}

function Lightbox({ item, onClose }) {
  const router = useRouter();
  if (!item) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="lightbox-frame"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close photo"
        >
          ✕
        </button>

        {/* Clicking the photo navigates to the /flower page */}
        <Image
            src={item.src}
            alt={item.caption}
            width={800}
            height={800}
            className="lightbox-image"
            onClick={() => router.push("/flower")}
            style={{ cursor: "pointer" }}
            priority
          />

          <p className="lightbox-caption">
            {item.caption}
          </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeTab] = useState("gallery");
  const [selected, setSelected] = useState(null);

  return (
    <div className="gallery-root">
      {/* ── NAVBAR ── */}
      <nav className="gal-navbar">
        <div className="gal-navbar-logo">
          <span className="gal-logo-badge">
            <img src="/icon.png" alt="Logo" width={32} height={26} />
          </span>
          <span className="gal-logo-text">yrrahclai</span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="gal-hero">
        <h1 className="gal-title">
          Our Gallery <span className="gal-heart">♡</span>
        </h1>
        <p className="gal-subtitle">
          Little moments, kept safe — tap a photo to see it up close.
        </p>
      </section>

      {/* ── PHOTO GRID ── */}
      <section className="gal-grid-wrap">
        <div className="gal-grid">
          {GALLERY_ITEMS.map((item) => (
            <PolaroidCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <Lightbox item={selected} onClose={() => setSelected(null)} />

      {/* ── CLOSE BUTTON ── */}
      <Link href="/" className="btn-close-gallery">
        Close Gallery <span className="btn-heart">♡</span>
      </Link>

      {/* ── BOTTOM TAB BAR (mobile) ── */}
      <nav className="bottom-nav mobile-only" aria-label="Primary">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`bottom-nav-item ${activeTab === tab.key ? "is-active" : ""}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}