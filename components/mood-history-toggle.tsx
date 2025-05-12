"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart2, List } from "lucide-react"
import { MoodHistoryList } from "@/components/mood-history-list"
import { MoodHistoryGraph } from "@/components/mood-history-graph"

export function MoodHistoryToggle() {
    return (
        <Card className="border-purple-100 bg-white/40 shadow-lg backdrop-blur-xl">
            <CardHeader>
                <CardTitle>Mood History</CardTitle>
                <CardDescription>Track your emotional patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="list">
                    <TabsList className="mb-4 grid w-full max-w-[400px] grid-cols-2 bg-purple-100/40 backdrop-blur-md">
                        <TabsTrigger value="list" className="flex items-center justify-center data-[state=active]:bg-white/60">
                            <List className="mr-2 h-4 w-4" />
                            List View
                        </TabsTrigger>
                        <TabsTrigger value="graph" className="flex items-center justify-center data-[state=active]:bg-white/60">
                            <BarChart2 className="mr-2 h-4 w-4" />
                            Graph View
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="list">
                        <MoodHistoryList />
                    </TabsContent>

                    <TabsContent value="graph">
                        <MoodHistoryGraph />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
