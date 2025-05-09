import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { mood, userStoreState } from "@/utils/types";

const userStore: StateCreator<userStoreState> = (set) => ({
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
  setName: (name: string) => {
    set((state) => ({
      name: name,
    }));
  },
  setCurrent_mental_state: (mentalState: string) => {
    set((state) => ({
      current_mental_state: mentalState,
    }));
  },
  setAuthenticated: (auth: boolean) => {
    set((state) => ({
      isAuthenticated: auth,
    }));
  },
  setRecommendation(recs: string[]) {
    set((state) => ({
      recommendations: recs,
    }));
  },
});

export const useUserStore = create<userStoreState>(userStore);
