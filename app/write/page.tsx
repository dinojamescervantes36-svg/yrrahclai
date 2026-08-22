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
import { LockIcon } from "../components/icons";
import { addSentMessage } from "@/lib/messages";

type Step = "form" | "preview" | "success";

export default function WritePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const canContinue = text.trim().length > 0;

  const handleSend = () => {
    try {
      addSentMessage(to, text);
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const reset = () => {
    setTo("");
    setText("");
    setStep("form");
  };

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
            Somewhere out there, someone is about to smile.
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
          <QuoteCard text={text} from="Someone" />
          <div className={styles.previewActions}>
            <Button fullWidth onClick={handleSend}>
              Send anonymously
            </Button>
            <span className={styles.promise}>
              <LockIcon size={13} /> 100% anonymous. Promise.
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

        <TextInput
          value={to}
          onChange={setTo}
          placeholder="Someone special..."
        />

        <div className={styles.field}>
          <label className={styles.h2} style={{ fontSize: "var(--fs-body2)" }}>
            Your message
          </label>
          <Textarea
            value={text}
            onChange={setText}
            placeholder="Write something from your heart..."
            rows={6}
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
