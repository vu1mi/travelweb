export const dynamic = "force-dynamic";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8088", // Match your Spring Boot backend port
});

export interface ChatbotRequest {
  message: string;
  sessionId?: string;
  userId?: number;
}

export interface TourResponse {
  id: number;
  name: string;
  priceAdult: number;
  priceChild: number;
  duration: number;
  transport: string;
  locations: string[];
  tourType: string;
}

export interface ChatbotResponse {
  message: string;
  sessionId: string;
  recommendedTours: TourResponse[];
}

export const getResponseAi = (
  message: string,
  sessionId?: string,
  userId?: number
) => {
  return api.post<ChatbotResponse>("/api/chatbot/chat", {
    message,
    sessionId,
    userId,
  });
};