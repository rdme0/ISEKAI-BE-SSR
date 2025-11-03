import { Prompt } from "@/app/admin/prompts/types";
import styles from './PromptsTable.module.css';

interface PromptsTableProps {
  prompts: Prompt[];
  onRowClick: (id: string) => void
}

export function PromptsTable({ prompts, onRowClick }: PromptsTableProps) {
  return (
      <table className={styles.promptsTable}>
        <thead>
        <tr>
          <th>Author</th>
          <th>Persona Name</th>
          <th>Public?</th>
          <th>created At</th>
        </tr>
        </thead>
        <tbody>
        {prompts.map((prompt) => (
            <tr key={prompt.id} onClick={() => onRowClick(prompt.id)} className={styles.promptRow}>
              <td>{prompt.author}</td>
              <td>{prompt.personaName}</td>
              <td>{prompt.isPublic ? 'O' : 'X'}</td>
              <td>{prompt.createdAt}</td>
            </tr>
        ))}
        </tbody>
      </table>
  );
}