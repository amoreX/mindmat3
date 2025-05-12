import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Lightbulb } from "lucide-react"

export function TodaysInsights() {
    return (
        <Card className="border-purple-100 bg-white/40 shadow-lg backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-500" />
                    Today's Insights
                </CardTitle>
                <CardDescription>AI analysis based on your recent journal entries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="rounded-lg bg-purple-50/60 p-4 backdrop-blur-md">
                    <h3 className="mb-2 flex items-center font-medium text-purple-800">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Mood Analysis
                    </h3>
                    <p className="text-sm text-gray-700">
                        Based on your journal entry today, you seem to be experiencing a mix of anxiety and hope. Your language
                        indicates some stress about upcoming deadlines, but also excitement about future possibilities.
                    </p>
                </div>

                <div className="rounded-lg bg-blue-50/60 p-4 backdrop-blur-md">
                    <h3 className="mb-2 flex items-center font-medium text-blue-800">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Thought Patterns
                    </h3>
                    <p className="text-sm text-gray-700">
                        I've noticed some all-or-nothing thinking in your entry. Try to recognize when you're using words like
                        "always" or "never" and challenge these absolute statements with more balanced perspectives.
                    </p>
                </div>

                <div className="rounded-lg bg-green-50/60 p-4 backdrop-blur-md">
                    <h3 className="mb-2 flex items-center font-medium text-green-800">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Progress Note
                    </h3>
                    <p className="text-sm text-gray-700">
                        You've been consistently journaling for 7 days now. Regular reflection is a powerful tool for self-awareness
                        and emotional regulation.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
