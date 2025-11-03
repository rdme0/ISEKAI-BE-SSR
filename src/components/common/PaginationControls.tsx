'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {PaginationControlProps} from "@/types/type";
import styles from './PagenationControls.module.css'

export default function PaginationControls(
    {currentPage, totalPages, basePath}: PaginationControlProps
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', String(newPage));

    router.push(`${basePath}?${currentParams.toString()}`);
  };

  return (
      <div className={styles.paginationControlsContainer}>
        <button className={styles.paginationSideButton}
                onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
          {'<'}
        </button>

        <div className={styles.pageNumberContainer}>
          {
            getPageRange(currentPage, totalPages).map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage ? styles.currentPageButton : styles.pageButton}>
                  {page}
                </button>
            ))
          }
        </div>

        <button className={styles.paginationSideButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}>
          {'>'}
        </button>
      </div>
  );
}

function getPageRange(currentPage: number, totalPages: number): number[] {
  const startPage = Math.max(currentPage - 5, 1)
  const endPage = Math.min(currentPage + 5, totalPages)
  const length = endPage - startPage + 1

  if (length < 1) return [1]

  return Array.from({length: length}, (_, i) => startPage + i)
}