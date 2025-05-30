export type mood = {
  journal: string;
  label: string;
  date: Date;
  user_id?: number | null | undefined;
};

export interface userStoreState {
  isAuthenticated: boolean;
  current_mental_state: string;
  name: string;
  email: string;
  recommendations: string[];
  insights: string[];
  mood_history: mood[];
  addMood: (mood: mood) => Promise<void>; // Made this async
  setMood: (moods: mood[]) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setCurrent_mental_state: (mentalState: string) => void;
  setAuthenticated: (auth: boolean) => void;
  setRecommendation: (recs: string[]) => void;
  setInsights: (insights: string[]) => void;
}
