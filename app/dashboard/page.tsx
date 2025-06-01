"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { getMentalHealth } from "@/utils/getMentalCondition";
import Analytics from "./analytics/page";

export default function Dashboard() {
  const router = useRouter();
  const {
    isAuthenticated,
    hydrated,
    email,
    setMood,
    setCurrent_mental_state,
    setRecommendation,
    setInsights,
    mood_history,
    insights,
  } = useUserStore();

  useEffect(() => {
    if (!hydrated) return;
    if (email == "") return;
  });

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push("/signin");
    }
  }, [hydrated, isAuthenticated]);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      const fetchData = async () => {
        try {
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

          if (userError) {
            console.error("Error fetching user data:", userError);
            return;
          }

          if (userData) {
            const { data: moodData, error: moodError } = await supabase
              .from("mood_history")
              .select("*")
              .eq("user_id", userData.id);

            if (moodError) {
              console.error("Error fetching mood data:", moodError);
              return;
            }

            const transformedMoods = moodData?.map((item: any) => ({
              journal: item.mood_description,
              label: item.mood_label,
              created_at: new Date(item.created_at),
            }));

            console.log("Transformed moods:", transformedMoods);

            if (transformedMoods) setMood(transformedMoods);
          }
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      };
      fetchData();
    }
  }, [hydrated, isAuthenticated]);

  useEffect(() => {
    if (mood_history.length > 0) {
      const geminiFetch = async () => {
        try {
          console.log("Fetching mental health analysis...");
          let response = await getMentalHealth({ mood_history: mood_history });
          console.log("Gemini response:", response);

          // Update local state with new data
          setCurrent_mental_state(response.current_mental_state);
          setRecommendation(response.recommendations);
          setInsights(response.mood_insights);
        } catch (error) {
          console.error("Error in geminiFetch:", error);
        }
      };
      geminiFetch();
    }
  }, [mood_history]);

  if (!hydrated) return null;

  return (
    <div>
      <Analytics />
    </div>
  );
}
