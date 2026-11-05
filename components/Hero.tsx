import styles from "./Hero.module.css";

type HeroProps = { title: string; subtitle: string };

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
