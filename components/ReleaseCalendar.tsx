import styles from "./ReleaseCalendar.module.css";

type ReleaseType = "stable" | "unstable" | "eol" | "dev";
type Release = { version: string; type: ReleaseType; date: string; notes?: string };
type Freeze = { label: string; date: string };

const badgeClass = {
  stable: styles.badgeStable,
  unstable: styles.badgeUnstable,
  eol: styles.badgeEol,
  dev: styles.badgeDev,
};

const badgeLabel = {
  stable: "Stabil",
  unstable: "Nostabil",
  eol: "Eskirgan",
  dev: "Rivojlanmoqda",
};

export function ReleaseTable({ releases }: { releases: Release[] }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Versiya</th>
            <th>Turi</th>
            <th>Sana</th>
            <th>Mas'ul</th>
          </tr>
        </thead>
        <tbody>
          {releases.map((r, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 600 }}>{r.version}</td>
              <td>
                <span className={`${styles.badge} ${badgeClass[r.type] || ""}`}>
                  {badgeLabel[r.type] || r.type}
                </span>
              </td>
              <td>{r.date}</td>
              <td>
                {r.notes ? (
                  <a href={`https://github.com/${r.notes}`} target="_blank" rel="noreferrer" className={styles.assignee}>@{r.notes}</a>
                ) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FreezeSchedule({ freezes }: { freezes: Freeze[] }) {
  return (
    <div className={styles.freezeGrid}>
      {freezes.map((f, i) => (
        <div className={styles.freezeCard} key={i}>
          <div className={styles.freezeLabel}>{f.label}</div>
          <div className={styles.freezeDate}>{f.date}</div>
        </div>
      ))}
    </div>
  );
}
