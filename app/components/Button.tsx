"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "secondary" | "text";

type CommonProps = {
  variant?: Variant;
  fullWidth?: boolean;
  icon?: ReactNode | null;
  children: ReactNode;
  href?: string;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function Button({
  variant = "primary",
  fullWidth = false,
  icon,
  children,
  href,
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.full : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedIcon =
    icon === null ? null : icon ?? <ArrowRightIcon size={18} className={styles.icon} />;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {resolvedIcon}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
      {resolvedIcon}
    </button>
  );
}
