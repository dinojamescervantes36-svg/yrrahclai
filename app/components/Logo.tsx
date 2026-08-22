import Link from "next/link";
import styles from "./Logo.module.css";
import { HeartOutlineIcon } from "./icons";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className={styles.logo} aria-label="yrrah home">
      <span className={styles.badge}>
        <HeartOutlineIcon size={18} />
      </span>
      <span className={styles.word}>yrrah</span>
    </Link>
  );
}
