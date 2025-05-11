"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/userStore"
import { supabase } from "@/lib/supabase-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import bcrypt from "bcryptjs";
import { signUpFormSchema } from "@/schemas/auth-schemas";

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";

const formSchema = signUpFormSchema;

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
    },
}


export function SignUpForm({ onModeChange }: { onModeChange: () => void }) {
    const { setAuthenticated } = useUserStore();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const handleSignin = async () => {
            try {
                const { data: existingUser, error: selectError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", values.email)
                    .single();

                if (existingUser) {
                    toast("Email already registered :/", {
                        style: {
                            color: "red"
                        }
                    })
                    return;
                }

                if (selectError && selectError.code !== "PGRST116") {
                    throw selectError;
                }

                const hashedPassword = await bcrypt.hash(values.password, 10);

                const { error: insertError } = await supabase.from("users").insert([
                    {
                        email: values.email,
                        name: values.name,
                        password: hashedPassword,
                        current_mental_state: "",
                        recommendations: [],
                    },
                ]);

                if (insertError) throw insertError;
                setAuthenticated(true);
                toast("Login Successful :/", {
                    style: {
                        color: "green"
                    }
                })

                router.push("/dashboard");
            } catch (err) {
                console.error("Signup error:", err);
                toast("Sign up error :/", {
                    style: {
                        color: "red"
                    }
                })
            } finally {
                setIsLoading(false);
            }
        };
        handleSignin();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </motion.div>

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

                <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Button variant="link" className="p-0" onClick={onModeChange}>
                        Log in
                    </Button>
                </motion.div>
            </form>
        </Form>
    )
}

