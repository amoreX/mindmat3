export type mood = {
  journal: string;
  label: string;
  date: Date;
};

export interface userStoreState {
  isAuthenticated: boolean;
  current_mental_state: string;
  name: string;
  recommendations: string[];
  mood_history: mood[];
  addMood: (mood: mood) => void;
  setMood: (moods: mood[]) => void;
  setName: (name: string) => void;
  setCurrent_mental_state: (mentalState: string) => void;
  setAuthenticated: (auth: boolean) => void;
  setRecommendation: (recs: string[]) => void;
}
