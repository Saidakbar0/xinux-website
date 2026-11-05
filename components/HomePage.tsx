import styles from "./HomePage.module.css";
import ScreenshotGallery from "./ScreenshotGallery";

const learningPaths = [
  {
    number: "01",
    title: "NixOS bilan tanishing",
    description: "O'rnatishdan boshlab konfiguratsiya va flakes asoslarigacha.",
    href: "/learn",
    action: "Qo'llanmani ochish",
  },
  {
    number: "02",
    title: "Xinux'ni yuklab oling",
    description: "Xinux relizlari, o'rnatish tasvirlari va chiqarilish jadvali.",
    href: "/download",
    action: "Yuklab olish sahifasi",
  },
  {
    number: "03",
    title: "Loyihaga hissa qo'shing",
    description: "Tarjima, hujjatlar yoki kundalik yordam bilan qatnashing.",
    href: "/l10n",
    action: "Hissa qo'shish",
  },
];

const resources = [
  { title: "Foydali havolalar", href: "/links", note: "Linux va NixOS resurslari" },
  { title: "Xinux ilovalari", href: "/apps", note: "Hamjamiyat loyihalari" },
  { title: "Chiqarilishlar", href: "/releases", note: "Relizlar va kalendar" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>O'zbek Linux hamjamiyati</p>
          <h1 id="home-title">
            Linuxni o'z tilingizda <em>o'rganing.</em>
          </h1>
          <p className={styles.intro}>
            NixOS va Linux haqida o'zbekcha qo'llanmalar, amaliy bilimlar va
            birga o'sadigan ochiq hamjamiyat.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href={`${basePath}/learn`}>
              Qo'llanmani boshlash <span aria-hidden="true">&#8594;</span>
            </a>
            <a className={styles.textAction} href={`${basePath}/l10n`}>
              Hissa qo'shish
            </a>
          </div>
          <p className={styles.heroNote}>Ochiq manba. O'zbek tilida. Hamjamiyat bilan.</p>
        </div>

        <div className={styles.mediaGallery}>
          <ScreenshotGallery />
          <p className={styles.imageCredit}>
            Rasmlar: NixOS contributors · GPL ·{" "}
            <a href="https://commons.wikimedia.org/wiki/File:NixOS_21.11_GNOME_with_Files_and_alternate_wallpaper_-_English.png" target="_blank" rel="noreferrer">Desktop</a>
            {" · "}
            <a href="https://commons.wikimedia.org/wiki/File:NixOS_21.11_GNOME_default_launcher_screen_-_English.png" target="_blank" rel="noreferrer">Launcher</a>
            {" · "}
            <a href="https://commons.wikimedia.org/wiki/File:NixOS_21.11_GNOME_default_desktop_-_English.png" target="_blank" rel="noreferrer">GNOME</a>
          </p>
        </div>
      </section>

      <div className={styles.principles} aria-label="Xinux haqida">
        <p><span>01</span> O'zbekcha bilimlar</p>
        <p><span>02</span> Ochiq hamjamiyat</p>
        <p><span>03</span> Birga rivojlanamiz</p>
      </div>

      <section className={styles.paths} aria-labelledby="paths-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Boshlash uchun</p>
          <h2 id="paths-title">Sizga kerakli yo'nalishni tanlang.</h2>
        </div>
        <div className={styles.pathList}>
          {learningPaths.map((path) => (
            <a className={styles.path} href={`${basePath}${path.href}`} key={path.number}>
              <span className={styles.pathNumber}>{path.number}</span>
              <span className={styles.pathBody}>
                <strong>{path.title}</strong>
                <span>{path.description}</span>
              </span>
              <span className={styles.pathAction}>
                {path.action} <span aria-hidden="true">&#8594;</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.resources} aria-labelledby="resources-title">
        <div className={styles.resourceIntro}>
          <p className={styles.eyebrow}>Xinux resurslari</p>
          <h2 id="resources-title">Kerakli ma'lumot bir joyda.</h2>
        </div>
        <div className={styles.resourceList}>
          {resources.map((resource) => (
            <a href={`${basePath}${resource.href}`} key={resource.href}>
              <span>
                <strong>{resource.title}</strong>
                <small>{resource.note}</small>
              </span>
              <span aria-hidden="true">&#8599;</span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.community} aria-labelledby="community-title">
        <div>
          <p className={styles.eyebrow}>Hamjamiyatga qo'shiling</p>
          <h2 id="community-title">Linuxni birga o'rganamiz va rivojlantiramiz.</h2>
        </div>
        <div className={styles.communityLinks}>
          <a href="https://t.me/xinux" target="_blank" rel="noreferrer">
            Telegram guruhiga o'tish <span aria-hidden="true">&#8599;</span>
          </a>
          <a href={`${basePath}/l10n`}>Tarjimaga hissa qo'shish <span aria-hidden="true">&#8594;</span></a>
        </div>
      </section>
    </div>
  );
}