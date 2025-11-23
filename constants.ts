
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NEON RAIN",
    role: "DOP",
    videoUrl: "", // Not used with Vimeo iframe approach
    vimeoId: "1139757776",
    imageUrl: "https://picsum.photos/800/1000?random=1",
    year: "2024"
  },
  {
    id: 2,
    title: "ECHO CHAMBER",
    role: "EDITOR",
    videoUrl: "",
    vimeoId: "1139757975",
    imageUrl: "https://picsum.photos/800/1000?random=2",
    year: "2023"
  },
  {
    id: 3,
    title: "VELOCITY",
    role: "DOP & EDIT",
    videoUrl: "",
    vimeoId: "1139757930",
    imageUrl: "https://picsum.photos/800/1000?random=3",
    year: "2023"
  },
  {
    id: 4,
    title: "SILENT CUT",
    role: "EDITOR",
    videoUrl: "",
    vimeoId: "1139758344",
    imageUrl: "https://picsum.photos/800/1000?random=4",
    year: "2022"
  },
  {
    id: 5,
    title: "RAW EMOTION",
    role: "DOP",
    videoUrl: "",
    vimeoId: "1139758283",
    imageUrl: "https://picsum.photos/800/1000?random=5",
    year: "2022"
  }
];

export const REELS = [
  { id: 1, title: "FASHION I", vimeoId: "1139758746" },
  { id: 2, title: "COMMERCIAL", vimeoId: "1139758685" },
  { id: 3, title: "LIFESTYLE", vimeoId: "1139758620" }
];

export const NAV_ITEMS = ["WORKS", "ABOUT", "CONTACT"];

export const SYSTEM_INSTRUCTION = `You are the AI assistant for Naveen, a high-end Cinematographer (DOP) and Video Editor. 
Tone: Professional, technical, concise, slightly cinematic. Use terminology like "frame rate", "dynamic range", "cut", "pacing".
Naveen runs "Anavaran Films".
He is based in India but available globally.
He specializes in Indian Wedding Shoots and Post-Production (Editing).
His style is "The Invisible Cut" - seamless, immersive, raw yet polished.
If asked for contact, provide prajapatinaveen8@gmail.com or +91 70523 26636.
Do not hallucinate projects not listed, but you can speak generally about his expertise in narrative and commercial work.`;
