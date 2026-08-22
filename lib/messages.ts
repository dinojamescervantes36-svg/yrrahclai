import { getSupabaseClient, isSupabaseConfigured } from "./supabase/client";
import type { Account } from "./accounts";
import type { Message } from "./types";

type Row = {
  id: string;
  sender: string;
  recipient: string;
  body: string;
  read: boolean;
  created_at: string;
  sender_label: string | null;
  recipient_label: string | null;
};

function toUiMessage(row: Row, me: Account): Message {
  return {
    id: row.id,
    to: row.recipient,
    from: row.sender,
    toLabel: row.recipient_label,
    fromLabel: row.sender_label,
    text: row.body,
    createdAt: new Date(row.created_at).getTime(),
    direction: row.sender === me ? "sent" : "received",
    read: row.read,
  };
}

export async function fetchSentMessages(me: Account): Promise<Message[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("sender", me)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map((row) => toUiMessage(row, me));
}

export async function fetchReceivedMessages(me: Account): Promise<Message[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("recipient", me)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map((row) => toUiMessage(row, me));
}

export async function sendMessage(
  me: Account,
  recipient: Account,
  text: string,
  labels?: { fromLabel?: string; toLabel?: string }
): Promise<Message> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender: me,
      recipient,
      body: text.trim(),
      sender_label: labels?.fromLabel?.trim() || null,
      recipient_label: labels?.toLabel?.trim() || null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return toUiMessage(data as Row, me);
}

export async function findMessage(id: string, me: Account): Promise<Message | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toUiMessage(data as Row, me) : null;
}

export async function markMessageRead(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("id", id)
    .eq("read", false);
  if (error) throw error;
}

export async function markAllReceivedRead(me: Account): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("recipient", me)
    .eq("read", false);
  if (error) throw error;
}

export async function deleteMessage(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw error;
}

export async function getUnreadCount(me: Account): Promise<number> {
  const supabase = getSupabaseClient();
  const { count, error } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("recipient", me)
    .eq("read", false);
  if (error) throw error;
  return count ?? 0;
}

/**
 * Live-updates for one account: fires on any insert/update/delete where the
 * account is either sender or recipient (e.g. a new message arriving, or a
 * read-receipt landing from another signed-in device).
 *
 * Multiple independent callers (the unread-badge counter, the messages
 * list, ...) may subscribe for the same account at once, so each call gets
 * its own uniquely-named channel — reusing one topic name across separate
 * RealtimeChannel instances throws "cannot add postgres_changes callbacks
 * ... after subscribe()".
 */
export function subscribeToAccount(me: Account, onChange: () => void): () => void {
  if (!isSupabaseConfigured) return () => {};
  const supabase = getSupabaseClient();
  const channelName = `messages-${me}-${Math.random().toString(36).slice(2)}`;
  const channel = supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages", filter: `recipient=eq.${me}` },
      onChange
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages", filter: `sender=eq.${me}` },
      onChange
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "just now";
  if (diff < hour) return `${Math.max(1, Math.round(diff / minute))} min ago`;
  if (diff < day) return `${Math.round(diff / hour)} hours ago`;
  const days = Math.round(diff / day);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}
