export type mood = {
  journal: string;
  label: string;
  date: Date;
  user_id?: number | null;
};

export interface userStoreState {
  isAuthenticated: boolean;
  current_mental_state: string;
  name: string;
  email: string;
  recommendations: string[];
  mood_history: mood[];
  // Add the missing properties that the error mentions
  insights: string[]; // Add this
  setInsights: (insights: string[]) => void; // Add this
  addMood: (mood: mood) => Promise<void>;
  setMood: (moods: mood[]) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setCurrent_mental_state: (mentalState: string) => void;
  setAuthenticated: (auth: boolean) => void;
  setRecommendation: (recs: string[]) => void;
}
