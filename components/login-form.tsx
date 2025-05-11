"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUserStore } from "@/store/userStore"
import { supabase } from "@/lib/supabase-client"
import bcrypt from "bcryptjs"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { loginFormSchema } from "@/schemas/auth-schemas"

const formSchema = loginFormSchema

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
    },
}

export function LoginForm({ onModeChange }: { onModeChange: () => void }) {
    const router = useRouter()
    const { setAuthenticated } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const handleLogin = async () => {
            try {
                const { data: user, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", values.email)
                    .single()

                if (!user || error) {
                    toast("Invalid email or user not found", {
                        style: { color: "red" },
                    })
                    return
                }

                const isPasswordCorrect = await bcrypt.compare(values.password, user.password)

                if (!isPasswordCorrect) {
                    toast("Incorrect password", {
                        style: { color: "red" },
                    })
                    return
                }

                setAuthenticated(true)
                toast("Login successful", {
                    style: { color: "green" },
                })
                router.push("/dashboard")
            } catch (err) {
                console.error("Login error:", err)
                toast("Something went wrong during login", {
                    style: { color: "red" },
                })
            } finally {
                setIsLoading(false)
            }
        }

        handleLogin()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </motion.div>

                <motion.div variants={itemVariants} className="text-right">
                    <Button variant="link" className="p-0 text-sm">
                        Forgot password?
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            "Log In"
                        )}
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Button variant="link" className="p-0" onClick={onModeChange}>
                        Sign up
                    </Button>
                </motion.div>
            </form>
        </Form>
    )
}
