export interface Prompt {
  id: string
  author: string
  personaName: string
  content: string | undefined
  isPublic: boolean
  createdAt: string
}

export interface PromptsPageResponse {
  prompts: Prompt[]
}

export enum DisplayMode {
  PROMPTS,
  ONE_PROMPT,
  CREATE,
}