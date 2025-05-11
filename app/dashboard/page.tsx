"use client"
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
export default function Dashboard() {
    const router = useRouter();
    const { isAuthenticated, hydrated, email, setAuthenticated } = useUserStore();
    const [name, setName] = useState();
    useEffect(() => {
        if (!hydrated) return;
        if (email == "") return;
        const testingSupa = async () => {
            const { data: userData, error: fuckingerror } = await supabase.from("users").select("*").eq("email", email).single();
            console.log(userData);
            setName(userData.name);
        };
        testingSupa();
    })
    useEffect(() => {
        if (hydrated && !isAuthenticated) {
            router.push("/signin");
        }
    }, [hydrated, isAuthenticated]);

    if (!hydrated) return null; // or loading UI

    return <div className="absolute " onClick={() => { setAuthenticated(false) }}>{name}</div>;
}
