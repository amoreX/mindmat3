export function MoodHistoryList() {
    // Sample data - in a real app, this would come from your database
    const moodData = [
        { date: "Today", mood: "Happy", emoji: "😊" },
        { date: "Yesterday", mood: "Anxious", emoji: "😰" },
        { date: "2 days ago", mood: "Calm", emoji: "😌" },
        { date: "3 days ago", mood: "Sad", emoji: "😔" },
        { date: "4 days ago", mood: "Happy", emoji: "😊" },
        { date: "5 days ago", mood: "Neutral", emoji: "😐" },
        { date: "6 days ago", mood: "Angry", emoji: "😠" },
    ]

    return (
        <div className="space-y-3">
            {moodData.map((day, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-purple-100 bg-white/40 p-3 backdrop-blur-md"
                >
                    <span className="font-medium">{day.date}</span>
                    <div className="flex items-center">
                        <span className="mr-2">{day.mood}</span>
                        <span className="text-2xl">{day.emoji}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
