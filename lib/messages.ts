import type { Message } from "./types";

const STORAGE_KEY = "yrrah_sent_messages";

// Static example data so the "Received" tab and the detail screen have
// something to show without a real backend — mirrors the mockup content.
export const RECEIVED_MESSAGES: Message[] = [
  {
    id: "r1",
    to: "you",
    text: "You're stronger than you think. Keep going!",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    direction: "received",
  },
  {
    id: "r2",
    to: "you",
    text: "I appreciate you more than you know.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    direction: "received",
  },
  {
    id: "r3",
    to: "you",
    text: "You make the world a little better just by being in it.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    direction: "received",
  },
];

export function getSentMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
}

export function addSentMessage(to: string, text: string): Message {
  const message: Message = {
    id: `s_${Date.now()}`,
    to: to.trim() || "Someone special",
    text: text.trim(),
    createdAt: Date.now(),
    direction: "sent",
  };
  const updated = [message, ...getSentMessages()];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return message;
}

export function removeSentMessage(id: string): Message[] {
  const updated = getSentMessages().filter((m) => m.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function findMessage(id: string): Message | undefined {
  return [...getSentMessages(), ...RECEIVED_MESSAGES].find((m) => m.id === id);
}

export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < hour) return `${Math.max(1, Math.round(diff / minute))} min ago`;
  if (diff < day) return `${Math.round(diff / hour)} hours ago`;
  const days = Math.round(diff / day);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}
