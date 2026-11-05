import styles from "./ReleaseFeature.module.css";
import type { ReactNode } from "react";

type ReleaseHeroProps = { version: string; codename?: string; date: string; description?: string };

export function ReleaseHero({ version, codename, date, description }: ReleaseHeroProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroVersion}>
        Xinux {version}
        {codename && <span className={styles.heroCodename}> ({codename})</span>}
      </h1>
      <p className={styles.heroDate}>{date}</p>
      {description && <p className={styles.heroDescription}>{description}</p>}
    </div>
  );
}

type FeatureProps = { title: string; image?: string; reverse?: boolean; children: ReactNode };

export function Feature({ title, image, reverse, children }: FeatureProps) {
  return (
    <div className={styles.feature}>
      <h2 className={styles.featureTitle}>{title}</h2>
      <div className={`${styles.featureContent} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.featureText}>{children}</div>
        {image && <img src={image} alt={title} className={styles.featureImage} />}
      </div>
    </div>
  );
}

type ChangelogProps = { title?: string; items: string[] };

export function Changelog({ title, items }: ChangelogProps) {
  return (
    <div className={styles.changelog}>
      <h2 className={styles.changelogTitle}>{title || "O'zgarishlar"}</h2>
      <ul className={styles.changelogList}>
        {items.map((item, i) => (
          <li key={i} className={styles.changelogItem}>
            <span className={styles.changelogDot} />
            <span className={styles.changelogText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AppGrid({ children }: { children: ReactNode }) {
  return <div className={styles.appGrid}>{children}</div>;
}

export function AppCard({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className={styles.appCard}>
      <h3 className={styles.appName}>{name}</h3>
      <p className={styles.appDescription}>{children}</p>
    </div>
  );
}
