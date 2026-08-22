"use client";

import { useEffect, useState } from "react";
import styles from "./messages.module.css";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import EnvelopeArt from "../components/EnvelopeArt";
import MessageCard from "../components/MessageCard";
import { LockIcon } from "../components/icons";
import { getReceivedMessages, getSentMessages, removeSentMessage } from "@/lib/messages";
import type { Message } from "@/lib/types";

type Tab = "sent" | "received";

export default function MessagesPage() {
  const [tab, setTab] = useState<Tab>("sent");
  const [sent, setSent] = useState<Message[]>([]);
  const [received, setReceived] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSent(getSentMessages());
    setReceived(getReceivedMessages());
    setLoaded(true);
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    setSent(removeSentMessage(id));
  };

  const unreadCount = received.filter((m) => !m.read).length;

  return (
    <div className="app-shell">
      <Header variant="title" title="My messages" />

      <main className={`app-scroll ${styles.body}`}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${tab === "sent" ? styles.active : ""}`}
            onClick={() => setTab("sent")}
          >
            Sent
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === "received" ? styles.active : ""}`}
            onClick={() => setTab("received")}
          >
            Received
            {unreadCount > 0 && <span className={styles.tabBadge}>{unreadCount}</span>}
          </button>
        </div>

        {tab === "sent" ? (
          !loaded ? null : sent.length === 0 ? (
            <EmptyState
              art={<EnvelopeArt size={140} />}
              title="No messages yet"
              description="When you send a message, it will appear here."
              action={
                <Button href="/write" icon={null}>
                  Write a message
                </Button>
              }
            />
          ) : (
            <div className={styles.list}>
              {sent.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onDelete={() => handleDelete(message.id)}
                />
              ))}
            </div>
          )
        ) : (
          <>
            <div className={styles.list}>
              {received.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>
            <div className={styles.note}>
              <LockIcon size={13} /> Private to this device
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
