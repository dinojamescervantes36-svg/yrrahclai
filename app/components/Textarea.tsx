"use client";

import type { TextareaHTMLAttributes } from "react";
import styles from "./Field.module.css";

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

export default function Textarea({
  label,
  value,
  onChange,
  maxLength = 500,
  className,
  ...rest
}: TextareaProps) {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.textareaWrap}>
        <textarea
          className={[styles.textarea, className ?? ""].filter(Boolean).join(" ")}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
      </div>
      <div className={styles.counter}>
        {value.length} / {maxLength}
      </div>
    </div>
  );
}
