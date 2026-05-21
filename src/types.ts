export interface Article {
  id: string;
  title: string;
  category: "Opinión y Cultura" | "Prensa Digital" | "Escritura Creativa" | "IA y Comunicación";
  subCategory: string;
  snippet: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
  externalUrl?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "Recibido" | "Leído" | "Procesado por Asistente de IA";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}
