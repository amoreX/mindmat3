"use client"
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import Analytics from "./analytics/page";
export default function Dashboard() {
    const router = useRouter();
    const { isAuthenticated, hydrated, email, setAuthenticated } = useUserStore();
    useEffect(() => {
        if (!hydrated) return;
        if (email == "") return;
        //code to fetch all data to hydrate components with
    })
    useEffect(() => {
        if (hydrated && !isAuthenticated) {
            router.push("/signin");
        }
    }, [hydrated, isAuthenticated]);

    if (!hydrated) return null;

    return <div >
        <Analytics />
    </div>;
}
