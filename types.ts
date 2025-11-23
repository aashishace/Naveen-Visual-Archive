
export interface Project {
  id: number;
  title: string;
  role: string;
  videoUrl: string; // For thumbnail loop (can be a short mp4 or vimeo background link)
  vimeoId: string; // For lightbox playback
  imageUrl: string; // Fallback
  year: string;
}

export interface Reel {
  id: number;
  vimeoId: string;
  title: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum ViewMode {
  CINEMA = 'CINEMA',
  EDIT = 'EDIT'
}
