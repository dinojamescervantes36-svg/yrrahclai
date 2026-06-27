"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./message.css";

const STEPS = [
  { icon: "♡", label: "Write", desc: "Type your message with love." },
  { icon: "✉", label: "Send", desc: "Share it to someone special." },
  { icon: "✦♡", label: "Make them smile", desc: "Brighten their day anonymously." },
];

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

// Same key used by home.js to persist messages.
const STORAGE_KEY = "yrrahclai_messages";

// Fallback content shown the first time, before any message has been sent.
const DEFAULT_MESSAGES = [
  {
    id: 1,
    lines: [
      "You mean so much to me.",
      "Thank you for being you.",
      "Your kindness knows no",
      "bounds.",
    ],
  },
];

function EnvelopeCard({ message, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const fullText = message.lines.join(" ");
  const isLong = fullText.length > 180;

  return (
    <div className="envelope-card">
      <button
        className="delete-message-btn"
        onClick={onDelete}
        aria-label="Delete message"
      >
        🗑️
      </button>
      <svg
        className="envelope-svg-big"
        viewBox="0 0 420 340"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="heartTile"
            width="42"
            height="42"
            patternUnits="userSpaceOnUse"
          >
            <rect width="42" height="42" fill="#bfe3ac" />
            <path
              d="M21 32 C10 24 8 17 13 13 C16.5 10.5 20 12 21 16 C22 12 25.5 10.5 29 13 C34 17 32 24 21 32 Z"
              fill="#a9d894"
              opacity="0.85"
            />
          </pattern>
        </defs>

        {/* back side flaps forming the open envelope silhouette */}
        <path
          d="M20 150 L210 70 L400 150 L400 300 L20 300 Z"
          fill="url(#heartTile)"
          stroke="#8fc878"
          strokeWidth="2"
        />
        {/* inner diagonal fold lines */}
        <path d="M20 150 L210 230 L400 150" fill="none" stroke="#8fc878" strokeWidth="2" />
        <path d="M20 300 L160 205" fill="none" stroke="#8fc878" strokeWidth="1.4" opacity="0.7" />
        <path d="M400 300 L260 205" fill="none" stroke="#8fc878" strokeWidth="1.4" opacity="0.7" />
      </svg>

      {/* paper note popping out of the envelope */}
      <div className="note-paper">
        {isLong && !expanded ? (
          <p className="collapsed">{fullText.slice(0, 180).trim()}…</p>
        ) : (
          message.lines.map((line, i) => (
            <p key={i} className={expanded ? "expanded" : ""}>
              {line}
            </p>
          ))
        )}

        {isLong && (
          <button
            className="read-more-btn"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}

        <span className="note-heart">💚</span>
      </div>

      {/* floating hearts */}
      <span className="float-heart fh1">💚</span>
      <span className="float-heart fh2">💚</span>
      <span className="float-heart fh3">💚</span>
      <span className="float-heart fh4">💚</span>
      <span className="sparkle sp1">✦</span>
      <span className="sparkle sp2">✦</span>
    </div>
  );
}

export default function ShowMessagePage() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [activeTab, setActiveTab] = useState("messages");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (saved.length > 0) {
      setMessages(saved);
    }
  }, []);

  const handleDeleteMessage = (id) => {
    if (!window.confirm("Delete this message?")) return;

    const updatedMessages = messages.filter((msg) => msg.id !== id);

    setMessages(updatedMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
  };

  return (
    <div className="show-message-root">
      {/* ── NAVBAR ── */}
      <nav className="sm-navbar">
        <div className="sm-navbar-logo">
          <span className="sm-logo-badge">
            <img src="/icon.png" alt="Logo" width={32} height={26} />
          </span>
          <span className="sm-logo-text">yrrahclai</span>
        </div>
      </nav>

      {/* ── ENVELOPES (one per saved message) ── */}
      <div className="sm-stage sm-stage-list">
        {messages.map((msg) => (
          <EnvelopeCard
            key={msg.id}
            message={msg}
            onDelete={() => handleDeleteMessage(msg.id)}
          />
        ))}
      </div>

      {/* ── CLOSE BUTTON ── */}
      <Link href="/" className="btn-close-message">
        Close Message <span className="btn-heart">♡</span>
      </Link>

      {/* ── INFO CARDS ── */}
      <section className="sm-steps-section">
        <div className="sm-steps">
          {STEPS.map((step) => (
            <div className="sm-step-card" key={step.label}>
              <div className="sm-step-icon-ring">
                <div className="sm-step-icon">{step.icon}</div>
              </div>
              <div className="sm-step-body">
                <strong>{step.label}</strong>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM TAB BAR (mobile) ── */}
      <nav className="bottom-nav mobile-only" aria-label="Primary">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`bottom-nav-item ${activeTab === tab.key ? "is-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}