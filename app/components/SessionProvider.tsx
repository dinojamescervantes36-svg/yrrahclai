"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearAccount,
  getStoredAccount,
  otherAccount as otherOf,
  storeAccount,
  type Account,
} from "@/lib/accounts";
import { getUnreadCount, subscribeToAccount } from "@/lib/messages";
import { isSupabaseConfigured } from "@/lib/supabase/client";

type SessionContextValue = {
  account: Account | null;
  otherAccount: Account | null;
  unreadCount: number;
  signIn: (account: Account) => void;
  signOut: () => void;
  refreshUnread: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

const PUBLIC_PATHS = new Set(["/signin"]);

export default function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // `ready`/`account` are hydrated together from localStorage in a single
  // post-mount effect (not during render) to avoid an SSR/client hydration
  // mismatch — the server has no window, so it always renders "signed out".
  const [session, setSession] = useState<{ ready: boolean; account: Account | null }>({
    ready: false,
    account: null,
  });
  const { ready, account } = session;
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time session hydration from localStorage, not a render-loop; must run post-mount for SSR safety.
    setSession({ ready: true, account: getStoredAccount() });
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!account && !PUBLIC_PATHS.has(pathname)) {
      router.replace("/signin");
    }
  }, [ready, account, pathname, router]);

  const refreshUnread = useCallback(() => {
    if (!account || !isSupabaseConfigured) return;
    getUnreadCount(account)
      .then(setUnreadCount)
      .catch(() => {});
  }, [account]);

  useEffect(() => {
    if (!account || !isSupabaseConfigured) return;
    refreshUnread();
    return subscribeToAccount(account, refreshUnread);
  }, [account, refreshUnread]);

  const signIn = useCallback((next: Account) => {
    storeAccount(next);
    setSession({ ready: true, account: next });
  }, []);

  const signOut = useCallback(() => {
    clearAccount();
    setSession({ ready: true, account: null });
    setUnreadCount(0);
    router.replace("/signin");
  }, [router]);

  // Avoid flashing protected content before we've checked localStorage, or
  // while we're redirecting an unsigned-in visitor to /signin.
  if (!ready) return null;
  if (!account && !PUBLIC_PATHS.has(pathname)) return null;

  return (
    <SessionContext.Provider
      value={{
        account,
        otherAccount: account ? otherOf(account) : null,
        unreadCount,
        signIn,
        signOut,
        refreshUnread,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
