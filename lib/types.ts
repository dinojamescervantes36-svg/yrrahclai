export type MessageDirection = "sent" | "received";

export type Message = {
  id: string;
  to: string;
  text: string;
  createdAt: number;
  direction: MessageDirection;
};
