import Link from "next/link";
import styles from "./MessageCard.module.css";
import { HeartFilledIcon, TrashIcon } from "./icons";
import { timeAgo } from "@/lib/messages";
import type { Message } from "@/lib/types";

export default function MessageCard({
  message,
  onDelete,
}: {
  message: Message;
  onDelete?: () => void;
}) {
  return (
    <div className={styles.row}>
      <Link href={`/messages/${message.id}`} className={styles.link} style={{ flex: 1, display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
        <span className={styles.icon}>
          <HeartFilledIcon size={18} />
        </span>
        <span className={styles.body}>
          <span className={styles.text}>{message.text}</span>
          <span className={styles.time}>{timeAgo(message.createdAt)}</span>
        </span>
      </Link>
      {onDelete && (
        <button
          type="button"
          className={styles.deleteBtn}
          aria-label="Delete message"
          onClick={onDelete}
        >
          <TrashIcon size={16} />
        </button>
      )}
    </div>
  );
}
