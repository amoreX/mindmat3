export type mood = {
  journal: string;
  label: string;
  created_at: Date;
  user_id?: number | null;
};

export interface userStoreState {
  isAuthenticated: boolean;
  current_mental_state: string;
  name: string;
  email: string;
  recommendations: string[];
  mood_history: mood[];
  insights: string[];
  setInsights: (insights: string[]) => void;
  addMood: (mood: mood) => Promise<void>;
  setMood: (moods: mood[]) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setCurrent_mental_state: (mentalState: string) => void;
  setAuthenticated: (auth: boolean) => void;
  setRecommendation: (recs: string[]) => void;
}
