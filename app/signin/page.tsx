"use client";

import { useRouter } from "next/navigation";
import styles from "./signin.module.css";
import Logo from "../components/Logo";
import { ACCOUNTS, type Account } from "@/lib/accounts";
import { useSession } from "../components/SessionProvider";
import { HeartOutlineIcon } from "../components/icons";

export default function SignInPage() {
  const router = useRouter();
  const { account, signIn } = useSession();

  const handlePick = (name: Account) => {
    signIn(name);
    router.replace("/");
  };

  return (
    <div className="app-shell">
      <main className={`app-scroll ${styles.body}`}>
        <div className={styles.brand}>
          <Logo href="/signin" />
        </div>
        <h1 className={styles.title}>What&rsquo;s your Thoughts today?</h1>
        <p className={styles.subtitle}>Pick your name to open your inbox.</p>

        <div className={styles.list}>
          {ACCOUNTS.map((name) => (
            <button
              key={name}
              type="button"
              className={`${styles.card} ${account === name ? styles.current : ""}`}
              onClick={() => handlePick(name)}
            >
              <span className={styles.avatar}>
                <HeartOutlineIcon size={20} />
              </span>
              <span className={styles.name}>{name}</span>
              {account === name && <span className={styles.tag}>Signed in</span>}
            </button>
          ))}
        </div>

        <p className={styles.note}>I recreated this web app just for both of us 💚</p>
      </main>
    </div>
  );
}
