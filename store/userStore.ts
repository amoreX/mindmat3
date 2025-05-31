import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { mood, userStoreState } from "@/utils/types";
import { supabase } from "@/lib/supabase-client";

type ExtendedUserStore = userStoreState & {
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
};

// Helper function to add mood to Supabase
const addMoodToSupabase = async (mood: mood, email: string) => {
  try {
    // First, get the user ID from the email
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      throw userError;
    }

    if (!userData) {
      throw new Error("User not found");
    }

    // Now insert the mood data
    const { data, error } = await supabase
      .from("mood_history")
      .insert({
        user_id: userData.id,
        mood_label: mood.label,
        mood_description: mood.journal,
        created_at: mood.date.toISOString(),
      })
      .select();

    if (error) {
      console.error("Error inserting mood:", error);
      throw error;
    }

    console.log("Mood successfully added to Supabase:", data);
    return data;
  } catch (error) {
    console.error("Failed to add mood to Supabase:", error);
    throw error;
  }
};

export const useUserStore = create<ExtendedUserStore>()(
  devtools(
    persist(
      (set, get) => ({
        hydrated: false,
        isAuthenticated: false,
        current_mental_state: "",
        name: "",
        email: "",
        recommendations: [],
        mood_history: [],
        insights: [], // Add this missing property
        addMood: async (mood: mood) => {
          set((state) => ({
            mood_history: [mood, ...state.mood_history],
          }));

          const currentState = get();
          if (currentState.email) {
            try {
              await addMoodToSupabase(mood, currentState.email);
            } catch (error) {
              console.error("Failed to sync mood to database:", error);
            }
          } else {
            console.warn("No email found, mood not synced to database");
          }
        },
        setMood: (moods: mood[]) => {
          set(() => ({ mood_history: moods }));
        },
        setName: (name: string) => {
          set(() => ({ name }));
        },
        setEmail: (email: string) => {
          set(() => ({ email }));
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
        setInsights: (insights: string[]) => {
          // Add this missing method
          set(() => ({ insights }));
        },
        setHydrated: (value: boolean) => {
          set(() => ({ hydrated: value }));
        },
      }),
      {
        name: "user-store",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          email: state.email,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
  ),
);
