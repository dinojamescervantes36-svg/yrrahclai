export type MessageDirection = "sent" | "received";

export type Message = {
  id: string;
  to: string;
  from: string;
  text: string;
  createdAt: number;
  direction: MessageDirection;
  read: boolean;
};
