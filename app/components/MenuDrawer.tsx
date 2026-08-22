"use client";

import Link from "next/link";
import styles from "./MenuDrawer.module.css";
import Logo from "./Logo";
import { useSession } from "./SessionProvider";
import {
  CloseIcon,
  GalleryIcon,
  HomeIcon,
  InfoIcon,
  LockIcon,
  MailIcon,
  MoreIcon,
  UserIcon,
  WriteIcon,
} from "./icons";

const LINKS = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Write a message", href: "/write", icon: WriteIcon },
  { label: "My messages", href: "/messages", icon: MailIcon },
  { label: "Gallery", href: "/gallery", icon: GalleryIcon },
  { label: "How it works", href: "/about#how-it-works", icon: InfoIcon },
  { label: "About yrrah", href: "/about", icon: UserIcon },
  { label: "Privacy & Safety", href: "/about#privacy", icon: LockIcon },
  { label: "FAQ", href: "/about#faq", icon: MoreIcon },
];

export default function MenuDrawer({ onClose }: { onClose: () => void }) {
  const { account } = useSession();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <Logo />
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Close menu"
            onClick={onClose}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {account && (
          <div className={styles.account}>
            <span className={styles.accountAvatar}>
              <UserIcon size={18} />
            </span>
            <span>
              <span className={styles.accountLabel}>Signed in as</span>
              <span className={styles.accountName}>{account}</span>
            </span>
          </div>
        )}

        <ul className={styles.list}>
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <Link href={link.href} className={styles.link} onClick={onClose}>
                  <span className={styles.linkIcon}>
                    <Icon size={20} />
                  </span>
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/signin" className={styles.link} onClick={onClose}>
              <span className={styles.linkIcon}>
                <UserIcon size={20} />
              </span>
              Switch account
            </Link>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.link} ${styles.danger}`}
              onClick={() => {
                onClose();
                window.alert("Thanks for letting us know — we'll look into it.");
              }}
            >
              <span className={styles.linkIcon}>
                <InfoIcon size={20} />
              </span>
              Report a problem
            </button>
          </li>
        </ul>

        <div className={styles.footer}>Be kind. Be real. Be you. 💚</div>
      </div>
    </div>
  );
}
