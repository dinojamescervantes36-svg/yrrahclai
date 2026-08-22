"use client";

import type { InputHTMLAttributes } from "react";
import styles from "./Field.module.css";
import { CloseIcon, UserIcon } from "./icons";

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  variant?: "default" | "filled";
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export default function TextInput({
  label,
  variant = "default",
  value,
  onChange,
  onClear,
  className,
  ...rest
}: TextInputProps) {
  const showClear = variant === "filled" && value.length > 0;

  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrap}>
        <input
          className={[styles.input, variant === "filled" ? styles.filled : "", className ?? ""]
            .filter(Boolean)
            .join(" ")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {showClear ? (
          <button
            type="button"
            className={styles.clearBtn}
            aria-label="Clear"
            onClick={() => (onClear ? onClear() : onChange(""))}
          >
            <CloseIcon size={14} />
          </button>
        ) : (
          <span className={styles.inputIcon}>
            <UserIcon size={18} />
          </span>
        )}
      </div>
    </div>
  );
}
