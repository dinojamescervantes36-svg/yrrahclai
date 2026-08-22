import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

export default function EmptyState({
  art,
  title,
  description,
  action,
}: {
  art?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className={styles.wrap}>
      {art && <div className={styles.art}>{art}</div>}
      <div className={styles.title}>{title}</div>
      <p className={styles.desc}>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
