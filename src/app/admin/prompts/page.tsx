import { getPrompts } from "@/lib/services/admin/prompts/prompt.service";
import { Direction, Sort } from "@/types/type";
import styles from './PromptsPage.module.css';
import PromptsView from "@/app/admin/prompts/PromptsView";

interface PromptsPageProps {
  searchParams: {
    page?: string;
    size?: string;
    sort?: string;
    direction?: string;
  };
}

export default async function PromptsPage({ searchParams }: PromptsPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1;
  const size = Number(params.size) || 20;
  const sort = params.sort as Sort || Sort.CREATED_AT;
  const direction = params.direction as Direction || Direction.DESC;
  const { prompts, totalPages } = await getPrompts({ page, size, sort, direction });

  return (
      <div className={styles.promptsPageContainer}>
        <PromptsView
            initialPrompts={prompts}
            totalPages={totalPages}
            currentPage={page}
        />
      </div>
  );
}