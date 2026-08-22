"use client";

import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./gallery.module.css";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import EmptyState from "../components/EmptyState";
import EnvelopeArt from "../components/EnvelopeArt";
import { CloseIcon, HeartOutlineIcon } from "../components/icons";

/**
 * Hardcoded gallery data — drop an image in /public and add an entry
 * here. `rotate` gives each card its slight scrapbook tilt.
 */
const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/photo-1.png",
    caption: "Flower 💚 · 28.06.2026",
    rotate: -3,
  },
];

type GalleryItem = (typeof GALLERY_ITEMS)[number];

export default function GalleryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <div className="app-shell">
      <Header variant="title" title="Gallery" />

      <main className={`app-scroll ${styles.body}`}>
        <div className={styles.intro}>
          <div className={styles.title}>
            Our Gallery <span className={styles.heart}>💚</span>
          </div>
          <p className={styles.subtitle}>
            Little moments, kept safe — tap a photo to see it up close.
          </p>
        </div>

        {GALLERY_ITEMS.length === 0 ? (
          <EmptyState
            art={<EnvelopeArt size={140} />}
            title="No photos yet"
            description="Little moments will show up here once they're added."
          />
        ) : (
          <div className={styles.grid}>
            {GALLERY_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                className={styles.card}
                style={{ "--rotate": `${item.rotate}deg` } as CSSProperties}
                onClick={() => setSelected(item)}
                aria-label={`Open photo: ${item.caption}`}
              >
                <span className={styles.tape} aria-hidden="true" />
                <span className={styles.photo}>
                  <Image src={item.src} alt={item.caption} width={300} height={300} />
                </span>
                <span className={styles.caption}>{item.caption}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              aria-label="Close photo"
              onClick={() => setSelected(null)}
            >
              <CloseIcon size={16} />
            </button>
            <Image
              src={selected.src}
              alt={selected.caption}
              width={600}
              height={600}
              className={styles.frameImage}
              onClick={() => router.push("/flower")}
              priority
            />
            <p className={styles.frameCaption}>{selected.caption}</p>
            <p className={styles.frameHint}>
              <HeartOutlineIcon size={12} style={{ verticalAlign: "-1px", marginRight: 4 }} />
              Tap the photo for a little surprise
            </p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
