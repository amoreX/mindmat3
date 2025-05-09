import { create,StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { mood, userStoreState } from "@/utils/types";

const userStore:StateCreator  = (set) => ({
  isAuthenticated: false,
  current_mental_state: "",
  name: "",
  recommendations: [],
  mood_history: [],

  addMood: (mood: mood) => {
    set((state) => ({
      mood_history: [mood, ...state.mood_history],
    }));
  },
  setMood: (moods: mood[]) => {
    set((state) => ({
      mood_history: moods,
    }));
  },
});
