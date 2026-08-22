export type MessageDirection = "sent" | "received";

export type Message = {
  id: string;
  to: string;
  from: string;
  /** Custom nickname the sender typed for the recipient (e.g. "Binibining Clai"). Falls back to `to` when empty. */
  toLabel: string | null;
  /** Custom nickname the sender typed for themselves (e.g. "Your lover"). Falls back to `from` when empty. */
  fromLabel: string | null;
  text: string;
  createdAt: number;
  direction: MessageDirection;
  read: boolean;
};
