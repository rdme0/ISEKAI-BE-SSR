"use client";

import { useEffect, useState } from "react";
import { getOnePrompt, updatePrompt } from "@/lib/services/admin/prompts/prompt.service";
import { Prompt } from "@/app/admin/prompts/types";
import styles from './OnePrompt.module.css';
import {BackIcon} from "@/components/common/BackIcon";
import {UpdatePromptRequest} from "@/lib/services/admin/prompts/types";

interface OnePromptProps {
  promptId: string;
  onBack: () => void;
}

export const OnePromptTable = ({ promptId, onBack }: OnePromptProps) => {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState<UpdatePromptRequest | null>(null);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        setLoading(true);
        const data = await getOnePrompt(promptId);
        setPrompt(data);
        setEditedPrompt({
          personaName: data.personaName,
          content: data.content || '',
          isPublic: data.isPublic,
        });
      } catch (error) {
        console.error("Failed to fetch prompt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [promptId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (prompt) {
      setEditedPrompt({
        personaName: prompt.personaName,
        content: prompt.content || '',
        isPublic: prompt.isPublic,
      });
    }
  };

  const handleSave = async () => {
    if (!editedPrompt) return;

    const success = await updatePrompt(promptId, editedPrompt);
    if (success) {
      alert('성공적으로 수정되었습니다.');
      window.location.href = '/admin/prompts';
    } else {
      alert('수정에 실패했습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setEditedPrompt(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!prompt) {
    return <div>Prompt not found.</div>;
  }

  return (
      <div className={styles.promptDetailTableContainer}>
        <div className={styles.buttonContainer}>
          <div onClick={onBack} style={{ cursor: 'pointer' }}>
            <BackIcon />
          </div>
        </div>
        <table className={styles.promptDetailTable}>
          <thead>
          <tr>
            <th className={styles.keyColumn}>Key</th>
            <th className={styles.valueColumn}>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>ID</td>
            <td>{prompt.id}</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{prompt.author}</td>
          </tr>
          <tr>
            <td>Persona Name</td>
            <td>
              {isEditing && editedPrompt ? (
                  <input
                      type="text"
                      name="personaName"
                      value={editedPrompt.personaName}
                      onChange={handleChange}
                      className={styles.inputField}
                  />
              ) : (
                  prompt.personaName
              )}
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              {isEditing && editedPrompt ? (
                  <textarea
                      name="content"
                      value={editedPrompt.content}
                      onChange={handleChange}
                      className={styles.textareaField}
                  />
              ) : (
                  <div className={styles.contentCellView}>
                    {prompt.content}
                  </div>
              )}
            </td>
          </tr>
          <tr>
            <td>isPublic</td>
            <td>
              {isEditing && editedPrompt ? (
                  <input
                      type="checkbox"
                      name="isPublic"
                      checked={editedPrompt.isPublic}
                      onChange={handleChange}
                  />
              ) : (
                  prompt.isPublic ? 'O' : 'X'
              )}
            </td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{prompt.createdAt}</td>
          </tr>
          </tbody>
        </table>
        <div className={styles.bottomButtonContainer}>
          {isEditing ? (
              <div>
                <button onClick={handleSave} className={styles.actionButton}>저장</button>
                <button onClick={handleCancel} className={styles.actionButton}>취소</button>
              </div>
          ) : (
              <button onClick={handleEdit} className={styles.actionButton}>수정</button>
          )}
        </div>
      </div>
  );
}
