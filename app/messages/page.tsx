"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./messages.module.css";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import EnvelopeArt from "../components/EnvelopeArt";
import MessageCard from "../components/MessageCard";
import Toast from "../components/Toast";
import { LockIcon } from "../components/icons";
import {
  deleteMessage,
  fetchReceivedMessages,
  fetchSentMessages,
  markAllReceivedRead,
  subscribeToAccount,
} from "@/lib/messages";
import type { Message } from "@/lib/types";
import { useSession } from "../components/SessionProvider";

type Tab = "sent" | "received";

export default function MessagesPage() {
  const { account, refreshUnread } = useSession();
  const [tab, setTab] = useState<Tab>("sent");
  const [sent, setSent] = useState<Message[]>([]);
  const [received, setReceived] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    if (!account) return;
    Promise.all([fetchSentMessages(account), fetchReceivedMessages(account)])
      .then(([s, r]) => {
        setSent(s);
        setReceived(r);
        setLoaded(true);
      })
      .catch(() => setError("Couldn't load your messages. Please try again."));
  }, [account]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!account) return;
    return subscribeToAccount(account, load);
  }, [account, load]);

  // "Seen it" resets the indicator: opening the Received tab marks every
  // unread message here as read, which clears the bottom-nav badge too.
  useEffect(() => {
    if (tab !== "received" || !account) return;
    if (!received.some((m) => !m.read)) return;
    markAllReceivedRead(account)
      .then(() => {
        refreshUnread();
        load();
      })
      .catch(() => {});
  }, [tab, account, received, refreshUnread, load]);

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    deleteMessage(id)
      .then(load)
      .catch(() => setError("Couldn't delete that message. Please try again."));
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
        ) : !loaded ? null : received.length === 0 ? (
          <EmptyState
            art={<EnvelopeArt size={140} />}
            title="No messages yet"
            description="When someone writes to you, it will appear here."
          />
        ) : (
          <>
            <div className={styles.list}>
              {received.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>
            <div className={styles.note}>
              <LockIcon size={13} /> Just between the two of you
            </div>
          </>
        )}
      </main>

      <BottomNav />
      {error && <Toast type="error" message={error} onClose={() => setError("")} />}
    </div>
  );
}
