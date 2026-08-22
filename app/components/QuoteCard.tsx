import styles from "./QuoteCard.module.css";
import { HeartFilledIcon } from "./icons";

export default function QuoteCard({
  eyebrow,
  text,
  from = "Someone",
  meta,
  onReport,
}: {
  eyebrow?: string;
  text: string;
  from?: string;
  meta?: string;
  onReport?: () => void;
}) {
  return (
    <div className={styles.card}>
      <span className={styles.iconBadge}>
        <HeartFilledIcon size={20} />
      </span>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      <p className={styles.quote}>&ldquo;{text}&rdquo;</p>
      <span className={styles.from}>— {from} 💚</span>
      {meta && (
        <div className={styles.meta}>
          <span>{meta}</span>
          {onReport && (
            <button type="button" className={styles.report} onClick={onReport}>
              Report
            </button>
          )}
        </div>
      )}
    </div>
  );
}
