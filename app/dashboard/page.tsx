"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import Analytics from "./analytics/page";
export default function Dashboard() {
  const router = useRouter();
  const {
    isAuthenticated,
    hydrated,
    email,
    setMood,
    setCurrent_mental_state,
    mood_history,
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
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();
        if (userData) {
          const { data: moodData, error: userError } = await supabase
            .from("mood_history")
            .select("*")
            .eq("user_id", userData.id);
          // console.log(moodData);
          const transformedMoods = moodData?.map((item: any) => ({
            journal: item.mood_description,
            label: item.mood_label,
            created_at: new Date(item.created_at),
          }));
          console.log(transformedMoods);
          if (transformedMoods) setMood(transformedMoods);
          setCurrent_mental_state(userData.current_mental_state);
        }
      };

      fetchData();
    }
  }, [hydrated, isAuthenticated]);

  useEffect(() => {
    if (mood_history.length > 0) {
      console.log("this shit will work now ");
      //send to gemini mood mood_history
      // get geminidata back as json
      // update that data to supabase and reload
      // recommendations , current_mental_state
    }
  }, [mood_history]);
  if (!hydrated) return null;

  return (
    <div>
      <Analytics />
    </div>
  );
}
