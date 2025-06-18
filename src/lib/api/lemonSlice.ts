import axios from 'axios';

const LEMON_SLICE_API_URL = 'https://api.lemonslice.com/v1';
const API_TOKEN = 'sk-fc7c759b-fc85-45cf-8423-4822c1640c63';

const lemonSliceApi = axios.create({
  baseURL: LEMON_SLICE_API_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface Character {
  id: string;
  name: string;
  description: string;
  avatar_url: string;
  voice_id: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  audio_url?: string;
  video_url?: string;
}

export const lemonSliceApiClient = {
  // Create a new character
  createCharacter: async (characterData: Partial<Character>): Promise<Character> => {
    const response = await lemonSliceApi.post('/characters', characterData);
    return response.data;
  },

  // Get a character by ID
  getCharacter: async (characterId: string): Promise<Character> => {
    const response = await lemonSliceApi.get(`/characters/${characterId}`);
    return response.data;
  },

  // List all characters
  listCharacters: async (): Promise<Character[]> => {
    const response = await lemonSliceApi.get('/characters');
    return response.data;
  },

  // Send a message to a character and get response
  chatWithCharacter: async (
    characterId: string,
    message: string,
    options?: {
      generateVideo?: boolean;
      generateAudio?: boolean;
    }
  ): Promise<ChatResponse> => {
    const response = await lemonSliceApi.post(`/characters/${characterId}/chat`, {
      message,
      ...options,
    });
    return response.data;
  },

  // Get chat history with a character
  getChatHistory: async (characterId: string): Promise<Message[]> => {
    const response = await lemonSliceApi.get(`/characters/${characterId}/chat`);
    return response.data;
  },
};

export default lemonSliceApiClient; 