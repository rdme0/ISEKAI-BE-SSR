import axios from 'axios';
import {Direction, Page, PageParams, Sort} from '@/types/type';
import type {Prompt} from '@/app/admin/prompts/types';
import {CreatePromptRequest, GetPromptsResponse, UpdatePromptRequest} from "@/lib/services/admin/prompts/types";

export async function getPrompts(
    pageParams: PageParams = {page: 0, size: 10, sort: Sort.CREATED_AT, direction: Direction.DESC},
): Promise<GetPromptsResponse> {
  try {
    const response = await axios.get<Page<Prompt>>(createAdminPromptsUrl(pageParams));

    return {prompts: response.data.content, totalPages: response.data.totalPages};
  } catch (error) {
    console.error("Failed to fetch prompts:", error);

    return {prompts: [], totalPages: 0}
  }
}

export async function getOnePrompt(id: string): Promise<Prompt> {
  try {
    const response = await axios.get<Prompt>(`${createBaseUrl()}/${id}`);

    return response.data as Prompt;
  } catch (error) {
    console.error("Failed to fetch prompt:", error);

    return {
      id: 'error',
      author: 'error',
      personaName: 'error',
      content: 'error',
      isPublic: true,
      createdAt: 'error'
    } as Prompt;
  }
}

export async function updatePrompt(id: string, data: UpdatePromptRequest): Promise<boolean> {
  try {
    await axios.put<Prompt>(`${createBaseUrl()}/${id}`, data);
    return true;
  } catch (error) {
    console.error("Failed to update prompt:", error);
    return false;
  }
}

export async function createPrompt(data: CreatePromptRequest): Promise<boolean> {
  try {
    await axios.post<Prompt>(createBaseUrl(), data);
    return true;
  } catch (error) {
    console.error("Failed to create prompt:", error);
    return false;
  }
}

function createBaseUrl(): string {
  const API_BASE_URL = process.env.API_BASE_URL;
  return `${API_BASE_URL}/admin/prompts`;
}

function createAdminPromptsUrl(
    pageParams: PageParams = {page: 0, size: 10, sort: Sort.CREATED_AT, direction: Direction.DESC},
): string {

  const params = new URLSearchParams();

  params.append('page', String(pageParams.page));
  params.append('size', String(pageParams.size));
  params.append('sort', pageParams.sort);
  params.append('direction', pageParams.direction);

  return `${createBaseUrl()}?${params.toString()}`;
}