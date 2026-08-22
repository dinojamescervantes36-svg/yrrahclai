"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./write.module.css";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Textarea from "../components/Textarea";
import QuoteCard from "../components/QuoteCard";
import Toast from "../components/Toast";
import { SendIcon } from "../components/icons";
import { sendMessage } from "@/lib/messages";
import { useSession } from "../components/SessionProvider";

type Step = "form" | "preview" | "success";

export default function WritePage() {
  const router = useRouter();
  const { account, otherAccount } = useSession();
  const [step, setStep] = useState<Step>("form");
  const [text, setText] = useState("");
  const [fromLabel, setFromLabel] = useState("");
  const [toLabel, setToLabel] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const canContinue = text.trim().length > 0;
  const displayFrom = fromLabel.trim() || account || "";
  const displayTo = toLabel.trim() || otherAccount || "";

  const handleSend = async () => {
    if (!account || !otherAccount || sending) return;
    setSending(true);
    setError("");
    try {
      await sendMessage(account, otherAccount, text, { fromLabel, toLabel });
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setText("");
    setFromLabel("");
    setToLabel("");
    setStep("form");
  };

  if (!account || !otherAccount) return null;

  if (step === "success") {
    return (
      <div className="app-shell">
        <main className={`app-scroll ${styles.successBody}`}>
          <span className={styles.successCircle}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className={styles.successTitle}>Your message is on its way 💚</div>
          <p className={styles.successDesc}>
            {otherAccount} will see it land in their inbox.
          </p>
          <div className={styles.successActions}>
            <Button variant="secondary" fullWidth onClick={reset}>
              Send another message
            </Button>
            <Button variant="text" icon={null} onClick={() => router.push("/")}>
              Back to home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (step === "preview") {
    return (
      <div className="app-shell">
        <Header variant="back" onBack={() => setStep("form")} />
        <main className={`app-scroll ${styles.previewBody}`}>
          <p className={styles.previewLead}>This is how your message will look.</p>
          <QuoteCard eyebrow={`To ${displayTo}`} text={text} from={displayFrom} />
          <div className={styles.previewActions}>
            <Button fullWidth disabled={sending} onClick={handleSend}>
              {sending ? "Sending..." : "Send message"}
            </Button>
            <span className={styles.promise}>
              <SendIcon size={13} /> Delivered straight to {otherAccount}.
            </span>
          </div>
        </main>
        {error && <Toast type="error" message={error} onClose={() => setError("")} />}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header variant="back" onBack={() => router.push("/")} />
      <main className={`app-scroll ${styles.body}`}>
        <div className={styles.h2}>Who is this for?</div>
        <div className={styles.field}>
          <TextInput
            value={toLabel}
            onChange={setToLabel}
            placeholder={`Someone special...`}
            variant="filled"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.h2} style={{ fontSize: "var(--fs-body2)" }}>
            Your name <span className={styles.optional}></span>
          </label>
          <TextInput
            value={fromLabel}
            onChange={setFromLabel}
            placeholder="So they know who it's from"
            variant="filled"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.h2} style={{ fontSize: "var(--fs-body2)" }}>
            Your message
          </label>
          <Textarea
            value={text}
            onChange={setText}
            placeholder="Write something from your heart..."
            rows={5}
          />
        </div>

        <div className={styles.spacer} />

        <Button fullWidth disabled={!canContinue} onClick={() => setStep("preview")}>
          Next
        </Button>
      </main>
      <BottomNav />
      {error && <Toast type="error" message={error} onClose={() => setError("")} />}
    </div>
  );
}
