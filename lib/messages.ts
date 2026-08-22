import type { Message } from "./types";

const SENT_KEY = "yrrah_sent_messages";
const READ_KEY = "yrrah_read_ids";

// Static example data so the "Received" tab and the detail screen have
// something to show without a real backend — mirrors the mockup content.
// Read/unread state for these lives separately in localStorage (READ_KEY),
// since this array itself is just a fixed seed.
const RECEIVED_SEED: Omit<Message, "read">[] = [
  {
    id: "r1",
    to: "you",
    from: "Alex",
    text: "You're stronger than you think. Keep going!",
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    direction: "received",
  },
  {
    id: "r2",
    to: "you",
    from: "Jamie",
    text: "I appreciate you more than you know.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    direction: "received",
  },
  {
    id: "r3",
    to: "you",
    from: "Taylor",
    text: "You make the world a little better just by being in it.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    direction: "received",
  },
];

function getReadIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(READ_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function markMessageRead(id: string): void {
  const ids = getReadIds();
  if (ids.includes(id)) return;
  window.localStorage.setItem(READ_KEY, JSON.stringify([...ids, id]));
}

export function getReceivedMessages(): Message[] {
  const readIds = new Set(getReadIds());
  return RECEIVED_SEED.map((m) => ({ ...m, read: readIds.has(m.id) }));
}

export function getUnreadCount(): number {
  return getReceivedMessages().filter((m) => !m.read).length;
}

export function getSentMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SENT_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
}

export function addSentMessage(to: string, from: string, text: string): Message {
  const message: Message = {
    id: `s_${Date.now()}`,
    to: to.trim() || "Someone special",
    from: from.trim() || "A friend",
    text: text.trim(),
    createdAt: Date.now(),
    direction: "sent",
    read: true,
  };
  const updated = [message, ...getSentMessages()];
  window.localStorage.setItem(SENT_KEY, JSON.stringify(updated));
  return message;
}

export function removeSentMessage(id: string): Message[] {
  const updated = getSentMessages().filter((m) => m.id !== id);
  window.localStorage.setItem(SENT_KEY, JSON.stringify(updated));
  return updated;
}

export function findMessage(id: string): Message | undefined {
  return [...getSentMessages(), ...getReceivedMessages()].find((m) => m.id === id);
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
