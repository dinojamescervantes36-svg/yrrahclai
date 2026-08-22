"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import MenuDrawer from "./components/MenuDrawer";
import Button from "./components/Button";
import EnvelopeArt from "./components/EnvelopeArt";
import { ChevronRightIcon, HeartOutlineIcon, LockIcon, MailIcon, WriteIcon } from "./components/icons";

const STEPS = [
  {
    icon: WriteIcon,
    title: "Write",
    desc: "Type your message with love.",
    href: "/write",
  },
  {
    icon: HeartOutlineIcon,
    title: "Send",
    desc: "Share it to someone special, anonymously.",
    href: "/write",
  },
  {
    icon: MailIcon,
    title: "Make them smile",
    desc: "It lands softly, straight from the heart.",
    href: "/messages",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <Header variant="home" onMenuClick={() => setMenuOpen(true)} />

      <main className="app-scroll">
      <section className={styles.hero}>
        <div className={styles.art}>
          <EnvelopeArt size={168} />
        </div>
        <h1 className={styles.title}>Send something from your heart 💚</h1>
        <p className={styles.subtitle}>
          A little message can make someone&rsquo;s entire day.
        </p>

        <div className={styles.ctaWrap}>
          <Button fullWidth onClick={() => router.push("/write")}>
            Send a message
          </Button>
          <div className={styles.badges}>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>
                <HeartOutlineIcon size={14} />
              </span>
              Anonymous
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>
                <LockIcon size={14} />
              </span>
              Safe
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>
                <HeartOutlineIcon size={14} />
              </span>
              From the heart
            </span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionTitle}>How it works</div>
          <div className={styles.sectionSub}>
            It&rsquo;s simple. It&rsquo;s kind. It&rsquo;s from the heart.
          </div>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <button
                type="button"
                key={step.title}
                className={styles.step}
                onClick={() => router.push(step.href)}
              >
                <span className={styles.stepIconRing}>
                  <Icon size={20} />
                </span>
                <span className={styles.stepBody}>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepDesc}>{step.desc}</div>
                </span>
                <span className={styles.stepChevron}>
                  <ChevronRightIcon size={18} />
                </span>
              </button>
            );
          })}
        </div>
      </section>
      </main>

      <BottomNav />
      {menuOpen && <MenuDrawer onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
