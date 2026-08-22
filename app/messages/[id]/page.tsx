"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./detail.module.css";
import Header from "../../components/Header";
import Button from "../../components/Button";
import QuoteCard from "../../components/QuoteCard";
import Toast from "../../components/Toast";
import { findMessage, removeSentMessage, timeAgo } from "@/lib/messages";
import type { Message } from "@/lib/types";

export default function MessageDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [message, setMessage] = useState<Message | null | undefined>(undefined);
  const [thanked, setThanked] = useState(false);

  useEffect(() => {
    setMessage(findMessage(params.id) ?? null);
  }, [params.id]);

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

  return (
    <div className="app-shell">
      <Header variant="back" />
      <main className={`app-scroll ${styles.body}`}>
        <QuoteCard
          eyebrow={isReceived ? "A message for you" : `Sent to ${message.to}`}
          text={message.text}
          from={isReceived ? "Someone" : "you"}
          meta={timeAgo(message.createdAt)}
          onReport={isReceived ? () => window.alert("Thanks for letting us know — we'll look into it.") : undefined}
        />

        <div className={styles.actions}>
          {isReceived ? (
            <Button
              fullWidth
              disabled={thanked}
              onClick={() => setThanked(true)}
            >
              {thanked ? "Thanks sent 💚" : "Say thank you"}
            </Button>
          ) : (
            <Button
              variant="secondary"
              fullWidth
              icon={null}
              onClick={() => {
                if (!window.confirm("Delete this message?")) return;
                removeSentMessage(message.id);
                router.push("/messages");
              }}
            >
              Delete message
            </Button>
          )}
        </div>
      </main>
      {thanked && (
        <Toast type="success" message="Thanks sent! 💚" onClose={() => setThanked(false)} />
      )}
    </div>
  );
}
