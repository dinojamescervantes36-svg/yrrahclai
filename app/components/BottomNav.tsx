"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";
import { HomeIcon, MailIcon, UserIcon, WriteIcon } from "./icons";

const TABS = [
  { key: "home", label: "Home", href: "/", icon: HomeIcon },
  { key: "write", label: "Write", href: "/write", icon: WriteIcon },
  { key: "messages", label: "Messages", href: "/messages", icon: MailIcon },
  { key: "about", label: "About", href: "/about", icon: UserIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Primary">
      {TABS.map((tab) => {
        const isActive =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`${styles.item} ${isActive ? styles.active : ""}`}
          >
            <Icon size={22} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
