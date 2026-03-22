import axios, { type AxiosRequestConfig } from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
axios.defaults.baseURL = BASE_URL;

const endpoint = "/notes";
const myApiKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string,
): Promise<NotesResponse> {
  const config: AxiosRequestConfig = {
    params: { page, perPage: 12, search },
    headers: {
      Authorization: `Bearer ${myApiKey}`,
    },
  };

  const response = await axios.get<NotesResponse>(endpoint, config);
  return response.data;
}

export async function createNote(note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${myApiKey}`,
    },
  };
  const response = await axios.post<Note>(endpoint, note, config);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${myApiKey}`,
    },
  };
  const response = await axios.delete<Note>(`${endpoint}/${id}`, config);
  return response.data;
}
