"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ScreenshotGallery.module.css";

const screenshots = [
  {
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/nixos/gnome-files.png`,
    alt: "NixOS 21.11 GNOME ish stolida Files fayl boshqaruvchisi ochilgan",
    label: "Ish stoli",
  },
  {
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/nixos/gnome-launcher.png`,
    alt: "NixOS GNOME ilovalar menyusi",
    label: "Ilovalar menyusi",
  },
  {
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/nixos/gnome-desktop.png`,
    alt: "NixOS GNOME ish stoli",
    label: "Ish stoli ko'rinishi",
  },
];

export default function ScreenshotGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index === null ? null : (index + 1) % screenshots.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + screenshots.length) % screenshots.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const changeImage = (direction: -1 | 1) => {
    setActiveIndex((index) =>
      index === null ? null : (index + direction + screenshots.length) % screenshots.length,
    );
  };

  return (
    <>
      <div className={styles.gallery} aria-label="NixOS ish stoli rasmlari">
        <figure className={styles.featured}>
          <button
            className={styles.imageButton}
            type="button"
            onClick={() => setActiveIndex(0)}
            aria-label={`Kattalashtirib ko'rish: ${screenshots[0].label}`}
          >
            <Image
              src={screenshots[0].src}
              alt={screenshots[0].alt}
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <span className={styles.zoomHint} aria-hidden="true">Kattalashtirish ↗</span>
          </button>
          <figcaption>
            <span>NixOS 21.11 · GNOME</span>
            <span>{screenshots[0].label}</span>
          </figcaption>
        </figure>

        <div className={styles.thumbnails}>
          {screenshots.slice(1).map((screenshot, index) => {
            const screenshotIndex = index + 1;
            return (
              <figure className={styles.thumbnail} key={screenshot.src}>
                <button
                  className={styles.imageButton}
                  type="button"
                  onClick={() => setActiveIndex(screenshotIndex)}
                  aria-label={`Kattalashtirib ko'rish: ${screenshot.label}`}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1920}
                    height={1080}
                    sizes="(max-width: 760px) 48vw, 22vw"
                  />
                  <span className={styles.zoomHint} aria-hidden="true">↗</span>
                </button>
                <figcaption>{screenshot.label}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className={styles.lightbox}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <section
            className={styles.viewer}
            role="dialog"
            aria-modal="true"
            aria-label="NixOS rasmlarini ko'rish"
          >
            <div className={styles.viewerToolbar}>
              <p>{screenshots[activeIndex].label}</p>
              <span>{activeIndex + 1} / {screenshots.length}</span>
              <button
                className={styles.closeButton}
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Rasmni yopish"
                title="Yopish (Esc)"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className={styles.viewerImage}>
              <Image
                src={screenshots[activeIndex].src}
                alt={screenshots[activeIndex].alt}
                fill
                sizes="100vw"
                priority
              />
            </div>
            <button
              className={`${styles.navButton} ${styles.previousButton}`}
              type="button"
              onClick={() => changeImage(-1)}
              aria-label="Oldingi rasm"
              title="Oldingi rasm (←)"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              type="button"
              onClick={() => changeImage(1)}
              aria-label="Keyingi rasm"
              title="Keyingi rasm (→)"
            >
              <span aria-hidden="true">›</span>
            </button>
          </section>
        </div>
      )}
    </>
  );
}
