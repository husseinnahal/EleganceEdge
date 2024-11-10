import styles from "./page.module.css";
import LandingPage from "@/app/(Static_pages)/LandingPage/page";

export default function Home() {
  return (
      <main className={styles.main}>
       <LandingPage/>
      </main>

  );
}
