"use client";

import styles from "./about.module.css";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { HeartFilledIcon, LockIcon, MailIcon, WriteIcon } from "../components/icons";

const STEPS = [
  { icon: WriteIcon, title: "Write", desc: "Type a message and sign it — no account needed." },
  { icon: HeartFilledIcon, title: "Send", desc: "It goes out straight to them, with your name on it." },
  { icon: MailIcon, title: "Make them smile", desc: "A little surprise lands softly in their day." },
];

export default function AboutPage() {
  return (
    <div className="app-shell">
      <Header variant="title" title="About yrrah" />

      <main className={`app-scroll ${styles.body}`}>
        <div className={styles.intro}>
          <span className={styles.badge}>
            <HeartFilledIcon size={26} />
          </span>
          <div className={styles.introTitle}>Small messages, big heart</div>
          <p className={styles.introDesc}>
            yrrah is a quiet place to send someone a kind word — signed with
            your name, gently, from the heart.
          </p>
        </div>

        <section id="how-it-works" className={styles.section}>
          <div className={styles.sectionTitle}>How it works</div>
          <div className={styles.steps}>
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div className={styles.step} key={step.title}>
                  <span className={styles.stepIcon}>
                    <Icon size={17} />
                  </span>
                  <div className={styles.stepText}>
                    <strong>{step.title}</strong>
                    <span>{step.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="privacy" className={styles.section}>
          <div className={styles.sectionTitle}>
            <LockIcon size={15} style={{ verticalAlign: "-2px", marginRight: 6 }} />
            Privacy & Safety
          </div>
          <p className={styles.paragraph}>
            Messages carry your name, so whoever gets one knows it&rsquo;s
            really from you — but never anything more than that. Everything
            you write stays on your own device; yrrah doesn&rsquo;t run it
            through a server or share it with anyone else. If something you
            receive doesn&rsquo;t feel right, use the Report option on that
            message.
          </p>
        </section>

        <section id="faq" className={styles.section}>
          <div className={styles.sectionTitle}>FAQ</div>
          <div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Do I need an account?</div>
              <p className={styles.faqA}>
                No sign-in required. Just add your name to a message before
                sending it, so the person on the other end knows it&rsquo;s
                from you.
              </p>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>What&rsquo;s the dot on Messages?</div>
              <p className={styles.faqA}>
                It means there&rsquo;s a message on this device you
                haven&rsquo;t opened yet. It clears as soon as you read it.
              </p>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Where are my messages stored?</div>
              <p className={styles.faqA}>
                Locally, in your browser. Clearing your browser data will
                clear your sent messages too.
              </p>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Can I delete a message?</div>
              <p className={styles.faqA}>
                Yes — open it from My Messages and choose Delete message.
              </p>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
