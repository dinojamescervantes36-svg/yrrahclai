"use client";

import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import Logo from "./Logo";
import { ArrowLeftIcon, HeartOutlineIcon, MenuIcon } from "./icons";

type HeaderProps =
  | { variant: "home"; onMenuClick: () => void }
  | { variant: "back"; onBack?: () => void }
  | { variant: "title"; title: string };

export default function Header(props: HeaderProps) {
  const router = useRouter();

  if (props.variant === "home") {
    return (
      <header className={styles.header}>
        <Logo />
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Open menu"
          onClick={props.onMenuClick}
        >
          <MenuIcon size={22} />
        </button>
      </header>
    );
  }

  if (props.variant === "back") {
    return (
      <header className={styles.header}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Go back"
          onClick={() => (props.onBack ? props.onBack() : router.back())}
        >
          <ArrowLeftIcon size={20} />
        </button>
        <span className={styles.heart}>
          <HeartOutlineIcon size={20} />
        </span>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <span className={styles.title}>{props.title}</span>
      <span className={styles.heart}>
        <HeartOutlineIcon size={20} />
      </span>
    </header>
  );
}
