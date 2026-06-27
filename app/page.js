"use client";

import React, { useState } from "react";
import "./home.css";

const STEPS = [
  { icon: "♡", label: "Write", desc: "Type your message with love." },
  { icon: "✉", label: "Send", desc: "Share it to someone special." },
  { icon: "✦♡", label: "Make them smile", desc: "Brighten their day anonymously." },
];

const TABS = [
  {
    key: "home",
    label: "Home",
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "about",
    label: "About",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="home-root">
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-badge">
            <span className="logo-icon">
              <img
                src="/icon.png"
                alt="Logo"
                width={44}
                height={36}
                className="logo-image"
              />
            </span>
            <span className="logo-badge-heart"></span>
          </span>
          <span className="logo-text">
            yrrahclai<span className="logo-heart mobile-only"></span>
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        {/* Left / text column */}
        <div className="hero-text">
          <h1 className="hero-title">
            Send a message<br />
            from your <span className="accent">heart</span>
            <span className="heart-deco">💚</span>
          </h1>
          <p className="hero-sub">
            Share your feelings, appreciation,<br />
            or a sweet surprise with someone you love.
          </p>
          <button className="btn-cta">
            Show Message <span className="btn-heart">♡</span>
          </button>
          <p className="anon-note">
            <span className="anon-heart">♡</span> It's anonymous and from the heart.
          </p>
        </div>

        {/* Right / envelope illustration */}
        <div className="hero-envelope" aria-hidden="true">
          <div className="envelope-glow" />
          <div className="envelope-wrap">
            {/* Floating hearts */}
            <div className="float-heart fh1">💚</div>
            <div className="float-heart fh2">💚</div>
            <div className="float-heart fh3">💚</div>
            <div className="float-heart fh4">💚</div>
            <div className="float-heart fh5">💚</div>

            {/* Sparkles */}
            <span className="sparkle sp1">✦</span>
            <span className="sparkle sp2">✦</span>
            <span className="sparkle sp3">✦</span>
            <span className="sparkle sp4">✦</span>

            {/* Envelope SVG */}
            <svg className="envelope-svg" viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="80" width="280" height="180" rx="12" fill="#d4edca" stroke="#9ecf82" strokeWidth="2" />
              <path d="M20 80 L160 10 L300 80 Z" fill="#b8dfa8" stroke="#9ecf82" strokeWidth="1.5" />
              <path d="M20 260 L120 170" stroke="#9ecf82" strokeWidth="1.2" />
              <path d="M300 260 L200 170" stroke="#9ecf82" strokeWidth="1.2" />
              <rect x="70" y="30" width="180" height="160" rx="8" fill="#f0faf0" stroke="#9ecf82" strokeWidth="1.2" transform="rotate(-4 160 110)" />
              <text x="95" y="90" fontFamily="Dancing Script, cursive" fontSize="16" fill="#355c42" transform="rotate(-4 160 110)">You mean</text>
              <text x="85" y="115" fontFamily="Dancing Script, cursive" fontSize="16" fill="#355c42" transform="rotate(-4 160 110)">so much to me.</text>
              <text x="90" y="140" fontFamily="Dancing Script, cursive" fontSize="16" fill="#355c42" transform="rotate(-4 160 110)">Thank you for</text>
              <text x="100" y="165" fontFamily="Dancing Script, cursive" fontSize="16" fill="#355c42" transform="rotate(-4 160 110)">being you.</text>
              <text x="200" y="175" fontFamily="Dancing Script, cursive" fontSize="18" fill="#3a9e4a" transform="rotate(-4 160 110)">♡</text>
              <text x="138" y="218" fontSize="42" textAnchor="middle">💚</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-it-works">
        <div className="steps">
          {STEPS.map((step) => (
            <div className="step-card" key={step.label}>
              <div className="step-icon-ring">
                <div className="step-icon">{step.icon}</div>
              </div>
              <div className="step-body">
                <strong>{step.label}</strong>
                <p>{step.desc}</p>
              </div>
              <svg className="step-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM TAB BAR (mobile) ── */}
      <nav className="bottom-nav mobile-only" aria-label="Primary">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`bottom-nav-item ${activeTab === tab.key ? "is-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}