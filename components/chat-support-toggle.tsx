"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
export function ChatSupport() {
    const router = useRouter()

    const handleStartChat = () => {
        // router.push("/dashboard/mindy")
        toast("Operational Soon!");
    }

    return (
        <Card className="border-purple-100 bg-gradient-to-r from-purple-50/40 to-indigo-50/40 shadow-lg backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Talk to Mindy</CardTitle>
                <CardDescription className="text-center">Your personal AI mental wellness assistant</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <motion.div
                    className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/90 backdrop-blur-xl">
                        <Brain className="h-12 w-12 text-purple-500" />
                        <div className="absolute inset-0 rounded-full border-4 border-purple-200 opacity-50"></div>
                        {/* Animated particles around the brain */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-2 w-2 rounded-full bg-purple-400"
                                initial={{
                                    x: 0,
                                    y: 0,
                                    opacity: 0.7,
                                }}
                                animate={{
                                    x: [0, Math.cos((i * Math.PI) / 4) * 50, 0],
                                    y: [0, Math.sin((i * Math.PI) / 4) * 50, 0],
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                <p className="mb-6 max-w-md text-center text-sm text-gray-600">
                    Mindy uses advanced AI to provide personalized mental wellness support, guided journaling, and emotional
                    insights through both text and voice conversations.
                </p>

                <Button
                    onClick={handleStartChat}
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-6 text-lg font-medium text-white shadow-lg transition-all hover:shadow-xl"
                >
                    <span className="relative z-10">Chat with Mindy</span>
                    <span className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
                    <Sparkles className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
                </Button>
            </CardContent>
        </Card>
    )
}
