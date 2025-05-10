"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Brain, BarChart2, Shield, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
    },
}

export function LearnMoreContent({ onBackClick }: { onBackClick: () => void }) {
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Insights",
            description:
                "Our advanced AI analyzes your journal entries and mood patterns to provide personalized insights and recommendations.",
        },
        {
            icon: MessageSquare,
            title: "Daily Journaling",
            description: "Express your thoughts and feelings in a safe, private space designed to help you process emotions.",
        },
        {
            icon: BarChart2,
            title: "Mood Tracking",
            description:
                "Track your emotional states over time and visualize patterns to better understand your mental health.",
        },
        {
            icon: Shield,
            title: "Private & Secure",
            description: "Your data is encrypted and never shared. Your privacy is our top priority.",
        },
        {
            icon: Sparkles,
            title: "Personalized Resources",
            description: "Access curated articles, videos, and exercises tailored to your specific needs and challenges.",
        },
    ]

    return (
        <motion.div className="space-y-12 py-8" variants={containerVariants}>
            <motion.div className="text-center" variants={itemVariants}>
                <Button variant="ghost" className="mb-6 flex items-center" onClick={onBackClick}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign Up
                </Button>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Discover</span>
                    <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        MindTracker AI
                    </span>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
                    Your personal AI companion for mental wellness and emotional growth
                </p>
            </motion.div>

            <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" variants={itemVariants}>
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="rounded-xl border border-purple-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3 text-purple-600">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white"
                variants={itemVariants}
            >
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold">Start Your Mental Wellness Journey Today</h2>
                    <p className="mt-4 text-lg text-purple-100">
                        Join thousands of users who have improved their mental well-being with MindTracker AI
                    </p>
                    <Button size="lg" className="mt-6 bg-white text-purple-600 hover:bg-gray-100" onClick={onBackClick}>
                        Sign Up Now
                    </Button>
                </div>
            </motion.div>

            <motion.div className="mx-auto max-w-3xl text-center" variants={itemVariants}>
                <h2 className="text-2xl font-bold">How It Works</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-600">
                            1
                        </div>
                        <h3 className="font-medium">Sign Up</h3>
                        <p className="text-sm text-gray-600">Create your secure account in seconds</p>
                    </div>
                    <div className="space-y-2">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-600">
                            2
                        </div>
                        <h3 className="font-medium">Track & Journal</h3>
                        <p className="text-sm text-gray-600">Record your moods and thoughts daily</p>
                    </div>
                    <div className="space-y-2">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-600">
                            3
                        </div>
                        <h3 className="font-medium">Get Insights</h3>
                        <p className="text-sm text-gray-600">Receive personalized AI analysis and recommendations</p>
                    </div>
                </div>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
                <Button size="lg" onClick={onBackClick}>
                    Get Started
                </Button>
            </motion.div>
        </motion.div>
    )
}
