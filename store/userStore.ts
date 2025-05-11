import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { mood, userStoreState } from "@/utils/types";

type ExtendedUserStore = userStoreState & {
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
};

export const useUserStore = create<ExtendedUserStore>()(
  devtools(
    persist(
      (set) => ({
        hydrated: false,
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
          set(() => ({ mood_history: moods }));
        },
        setName: (name: string) => {
          set(() => ({ name }));
        },
        setCurrent_mental_state: (mentalState: string) => {
          set(() => ({ current_mental_state: mentalState }));
        },
        setAuthenticated: (auth: boolean) => {
          set(() => ({ isAuthenticated: auth }));
        },
        setRecommendation: (recs: string[]) => {
          set(() => ({ recommendations: recs }));
        },
        setHydrated: (value: boolean) => {
          set(() => ({ hydrated: value }));
        },
      }),
      {
        name: "user-store",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true); // ✅ Use your own method to update `hydrated`
        },
      }
    )
  )
);
