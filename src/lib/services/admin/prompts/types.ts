import type {Prompt} from "@/app/admin/prompts/types";

export interface GetPromptsResponse {
  prompts: Prompt[];
  totalPages: number;
}

export interface UpdatePromptRequest {
  personaName: string;
  content: string;
  isPublic: boolean;
}

export interface CreatePromptRequest {
  personaName: string;
  content: string;
  isPublic: boolean;
}