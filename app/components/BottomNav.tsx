"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";
import { GalleryIcon, HomeIcon, MailIcon, UserIcon, WriteIcon } from "./icons";
import { useSession } from "./SessionProvider";

const TABS = [
  { key: "home", label: "Home", href: "/", icon: HomeIcon },
  { key: "write", label: "Write", href: "/write", icon: WriteIcon },
  { key: "messages", label: "Messages", href: "/messages", icon: MailIcon },
  { key: "gallery", label: "Gallery", href: "/gallery", icon: GalleryIcon },
  { key: "about", label: "About", href: "/about", icon: UserIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { unreadCount } = useSession();

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
            <span className={styles.iconWrap}>
              <Icon size={20} />
              {tab.key === "messages" && unreadCount > 0 && (
                <span className={styles.badge}>{unreadCount > 9 ? "9+" : unreadCount}</span>
              )}
            </span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
