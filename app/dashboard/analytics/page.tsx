"use client"
import { JournalEntry } from "@/components/journal-entry"
import { TodaysInsights } from "@/components/todays-insights"
import { Recommendations } from "@/components/recommendations"
import { MoodHistoryToggle } from "@/components/mood-history-toggle"
import { ChatSupport } from "@/components/chat-support-toggle"
import { useUserStore } from "@/store/userStore"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Lenis from 'lenis'

import { useEffect } from "react"


export default function Analytics() {
    const { setAuthenticated } = useUserStore();
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });

    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative z-10 space-y-8 p-8">
            <div className="flex items-center justify-between">
                <motion.h1
                    className="text-4xl font-bold tracking-tight"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                >
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        MindTracker AI
                    </span>
                </motion.h1>
                <Button
                    className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                    onClick={() => setAuthenticated(false)}
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-8">
                {/* Journal Entry - Centered */}
                <motion.div
                    className="mx-auto w-full max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <JournalEntry />
                </motion.div>

                {/* AI Insights - Split into two cards */}
                <motion.div
                    className="grid grid-cols-1 gap-8 md:grid-cols-2"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <TodaysInsights />
                    <Recommendations />
                </motion.div>

                {/* Mood History with Toggle */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <MoodHistoryToggle />
                </motion.div>

                {/* Chat Support with Toggle to Chat Interface */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <ChatSupport />
                </motion.div>
            </div>
        </div>
    )
}