"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import Analytics from "./analytics/page";
export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, hydrated, email } = useUserStore();
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
      //Fetch shit and load into zustand store and call apis and all that bs
    }
  });
  if (!hydrated) return null;

  return (
    <div>
      <Analytics />
    </div>
  );
}
