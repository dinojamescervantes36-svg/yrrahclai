export const ACCOUNTS = ["Yrrah Clai Corpuz", "Dino James Cervantes"] as const;

export type Account = (typeof ACCOUNTS)[number];

const SESSION_KEY = "yrrah_account";

function isAccount(value: string | null): value is Account {
  return value !== null && (ACCOUNTS as readonly string[]).includes(value);
}

export function getStoredAccount(): Account | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  return isAccount(raw) ? raw : null;
}

export function storeAccount(account: Account): void {
  window.localStorage.setItem(SESSION_KEY, account);
}

export function clearAccount(): void {
  window.localStorage.removeItem(SESSION_KEY);
}

export function otherAccount(me: Account): Account {
  return ACCOUNTS.find((a) => a !== me)!;
}

export function firstName(name: string): string {
  return name.split(" ")[0];
}
