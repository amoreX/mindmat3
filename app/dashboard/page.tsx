"use client"
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const { isAuthenticated, hydrated } = useUserStore();

    useEffect(() => {
        if (hydrated && !isAuthenticated) {
            router.push("/signin");
        }
    }, [hydrated, isAuthenticated]);

    if (!hydrated) return null; // or loading UI

    return <div>ok</div>;
}
