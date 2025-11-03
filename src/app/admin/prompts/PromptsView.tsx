"use client";

import {useState} from "react";
import {Prompt} from "@/app/admin/prompts/types";
import {PromptsTable} from "@/components/admin/prompts/PromptsTable";
import {OnePromptTable} from "@/components/admin/prompts/OnePromptTable";
import PaginationControls from "@/components/common/PaginationControls";
import {DisplayMode} from "@/app/admin/prompts/types";
import {CreatePrompt} from "@/components/admin/prompts/CreatePrompt";
import styles from './PromptsPage.module.css';

interface PromptsViewProps {
  initialPrompts: Prompt[];
  totalPages: number;
  currentPage: number;
}

export default function PromptsView({initialPrompts, totalPages, currentPage}: PromptsViewProps) {
  const [mode, setMode] = useState(DisplayMode.PROMPTS);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setSelectedPromptId(id);
    setMode(DisplayMode.ONE_PROMPT);
  };

  const handleBackToList = () => {
    setSelectedPromptId(null);
    setMode(DisplayMode.PROMPTS);
  }

  const handleCreateClick = () => {
    setMode(DisplayMode.CREATE);
  }

  if (mode === DisplayMode.ONE_PROMPT && selectedPromptId) {
    return <OnePromptTable promptId={selectedPromptId} onBack={handleBackToList}/>;
  }

  if (mode === DisplayMode.CREATE) {
    return <CreatePrompt onCancel={handleBackToList} />;
  }

  return (
      <div>
        <div className={styles.header}>
          <button onClick={handleCreateClick} className={styles.createButton}>
            새 프롬프트 작성
          </button>
        </div>
        <PromptsTable prompts={initialPrompts} onRowClick={handleRowClick}/>
        <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/admin/prompts"/>
      </div>
  );
}
