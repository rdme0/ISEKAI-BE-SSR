"use client";

import { useState } from "react";
import { createPrompt } from "@/lib/services/admin/prompts/prompt.service";
import { CreatePromptRequest } from "@/lib/services/admin/prompts/types";
import styles from './OnePrompt.module.css';

interface CreatePromptProps {
  onCancel: () => void;
}

export const CreatePrompt = ({ onCancel }: CreatePromptProps) => {
  const [newPrompt, setNewPrompt] = useState<CreatePromptRequest>({
    personaName: '',
    content: '',
    isPublic: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setNewPrompt(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    const success = await createPrompt(newPrompt);
    if (success) {
      alert('성공적으로 생성되었습니다.');
      window.location.href = '/admin/prompts';
    } else {
      alert('생성에 실패했습니다.');
    }
  };

  return (
      <div className={styles.promptDetailTableContainer}>
        <table className={styles.promptDetailTable}>
          <thead>
          <tr>
            <th className={styles.keyColumn}>Key</th>
            <th className={styles.valueColumn}>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Persona Name</td>
            <td>
              <input
                  type="text"
                  name="personaName"
                  value={newPrompt.personaName}
                  onChange={handleChange}
                  className={styles.inputField}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                  name="content"
                  value={newPrompt.content}
                  onChange={handleChange}
                  className={styles.textareaField}
              />
            </td>
          </tr>
          <tr>
            <td>isPublic</td>
            <td>
              <input
                  type="checkbox"
                  name="isPublic"
                  checked={newPrompt.isPublic}
                  onChange={handleChange}
              />
            </td>
          </tr>
          </tbody>
        </table>
        <div className={styles.bottomButtonContainer}>
          <button onClick={handleSave} className={styles.actionButton}>저장</button>
          <button onClick={onCancel} className={styles.actionButton}>취소</button>
        </div>
      </div>
  );
};
