"use client"

import { useState } from "react"
import { Loader2, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function JournalEntry() {
    const [entry, setEntry] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = () => {
        if (!entry.trim()) {
            toast("Entry is empty", {
                style: {
                    color: "red"
                }
            })
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setEntry("")
            toast("Journal Entry saved", {
                style: {
                    color: "green"
                }
            })
        }, 1500)
    }

    return (
        <Card className="border-purple-100 bg-white/40 shadow-lg backdrop-blur-xl">
            <CardHeader className=" pb-4 backdrop-blur-xl">
                <CardTitle className="text-center text-2xl bg-transparent">Daily Journal</CardTitle>
                <CardDescription className="text-center">
                    Write about your day, thoughts, or feelings and MindMate will provide personalized insights.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <Textarea
                    placeholder="How was your day? What's on your mind?"
                    className="min-h-[200px] resize-none border-purple-100 bg-white/60 focus-visible:ring-purple-400"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">AI-powered insights will be generated after submission</div>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
