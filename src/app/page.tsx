"use client";

import styles from './page.module.css';
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/admin/prompts');
  };

  return (
      <div className={styles.buttonContainer}>
        <button className={styles.promptPageButton}
                onClick={handleNavigate}
        >프롬프트 페이지
        </button>
      </div>
  );
}
