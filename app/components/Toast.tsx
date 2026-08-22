"use client";

import styles from "./Toast.module.css";
import { CheckIcon, CloseIcon, WarningIcon } from "./icons";

export type ToastKind = "success" | "error";

export default function Toast({
  type,
  message,
  onClose,
}: {
  type: ToastKind;
  message: string;
  onClose: () => void;
}) {
  return (
    <div className={`${styles.toast} ${styles[type]}`} role="status">
      <span className={styles.icon}>
        {type === "success" ? <CheckIcon size={18} /> : <WarningIcon size={18} />}
      </span>
      <span className={styles.message}>{message}</span>
      <button type="button" className={styles.close} aria-label="Dismiss" onClick={onClose}>
        <CloseIcon size={14} />
      </button>
    </div>
  );
}
