"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/sign-up-form"
import { LoginForm } from "@/components/login-form"
import { LearnMoreContent } from "@/components/learn-more-content"
import Lenis from 'lenis'


type FormMode = "signup" | "login" | "learn-more"

export default function Signin() {
    const [formMode, setFormMode] = useState<FormMode>("signup")
    const lenis = new Lenis({
        autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
        console.log(e);
    });

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
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1,
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
        exit: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.3 },
        },
    }

    return (
        <div className="container relative z-10 mx-auto min-h-screen px-4 py-12">
            <AnimatePresence mode="wait">
                {formMode !== "learn-more" ? (
                    <motion.div
                        key="signin-form"
                        className="grid h-[calc(100vh-6rem)] items-center  lg:grid-cols-2 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Left side */}
                        <motion.div
                            className="flex flex-col space-y-4 text-center lg:text-left"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.h1
                                className="flex text-4xl justify-center sm:justify-start font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
                                variants={itemVariants}
                            >
                                <span className="block">Mind</span>
                                <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    Mate
                                </span>
                            </motion.h1>
                            <motion.p
                                className="mx-auto max-w-md text-lg text-gray-600 lg:mx-0"
                                variants={itemVariants}
                            >
                                Your AI-powered companion for mental wellness. Track your mood, get insights, and improve your mental
                                health journey.
                            </motion.p>
                            <motion.div className="mt-6 flex justify-center lg:justify-start" variants={itemVariants}>
                                <div className="ml-3 inline-flex">
                                    <Button variant="outline" size="lg" onClick={() => setFormMode("learn-more")}>
                                        Learn More
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right side: Auth Form */}
                        <motion.div
                            className="mt-12 rounded-2xl border border-gray-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm lg:mt-0"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="mx-auto max-w-md">
                                <motion.h2
                                    className="mb-6 text-center text-3xl font-bold text-gray-900"
                                    variants={itemVariants}
                                >
                                    {formMode === "signup" ? "Create your account" : "Welcome back"}
                                </motion.h2>

                                {formMode === "signup" ? (
                                    <SignUpForm onModeChange={() => setFormMode("login")} />
                                ) : (
                                    <LoginForm onModeChange={() => setFormMode("signup")} />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="learn-more"
                        className="mx-auto max-w-4xl"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <LearnMoreContent onBackClick={() => setFormMode("signup")} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
