"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./detail.module.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import QuoteCard from "../../components/QuoteCard";
import Toast from "../../components/Toast";
import {
  deleteMessage,
  findMessage,
  markMessageRead,
  sendMessage,
  timeAgo,
} from "@/lib/messages";
import type { Message } from "@/lib/types";
import { useSession } from "../../components/SessionProvider";

export default function MessageDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { account, otherAccount, refreshUnread } = useSession();
  const [message, setMessage] = useState<Message | null | undefined>(undefined);
  const [thanked, setThanked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!account) return;
    let cancelled = false;

    findMessage(params.id, account)
      .then(async (found) => {
        if (cancelled) return;
        setMessage(found);
        if (found && found.direction === "received" && !found.read) {
          await markMessageRead(found.id);
          if (cancelled) return;
          refreshUnread();
          setMessage({ ...found, read: true });
        }
      })
      .catch(() => {
        if (!cancelled) setMessage(null);
      });

    return () => {
      cancelled = true;
    };
  }, [params.id, account, refreshUnread]);

  if (message === undefined) return null;

  if (!message) {
    return (
      <div className="app-shell">
        <Header variant="back" />
        <main className={`app-scroll ${styles.notFound}`}>
          <p>This message couldn&rsquo;t be found.</p>
          <Button href="/messages" icon={null}>
            Back to messages
          </Button>
        </main>
      </div>
    );
  }

  const isReceived = message.direction === "received";
  const senderDisplay = message.fromLabel || message.from;
  const recipientDisplay = message.toLabel || message.to;

  const handleThanks = async () => {
    if (!account || !otherAccount || thanked) return;
    try {
      await sendMessage(account, otherAccount, "Thank you for this — it means a lot to me. 💚");
      setThanked(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteMessage(message.id);
      router.push("/messages");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app-shell">
      <Header variant="back" />
      <main className={`app-scroll ${styles.body}`}>
        <QuoteCard
          eyebrow={isReceived ? "A message for you" : `Sent to ${recipientDisplay}`}
          text={message.text}
          from={senderDisplay}
          meta={timeAgo(message.createdAt)}
          onReport={isReceived ? () => window.alert("Thanks for letting us know — we'll look into it.") : undefined}
        />

        <div className={styles.actions}>
          {isReceived ? (
            <Button
              fullWidth
              disabled={thanked}
              onClick={handleThanks}
            >
              {thanked ? "Thanks sent 💚" : "Say thank you"}
            </Button>
          ) : (
            <Button
              variant="secondary"
              fullWidth
              icon={null}
              onClick={handleDelete}
            >
              Delete message
            </Button>
          )}
        </div>
      </main>
      {thanked && (
        <Toast type="success" message="Thanks sent! 💚" onClose={() => setThanked(false)} />
      )}
      {error && <Toast type="error" message={error} onClose={() => setError("")} />}
    </div>
  );
}
