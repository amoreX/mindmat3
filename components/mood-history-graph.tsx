export function MoodHistoryGraph() {
    return (
        <div className="space-y-4">
            <div className="h-[300px] rounded-lg bg-white/40 p-4 backdrop-blur-md">
                <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                    <p className="mb-2">Mood distribution for the past 7 days</p>
                    <p className="text-sm">(Bar chart visualization will appear here)</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-green-50/60 p-3 text-center backdrop-blur-md">
                    <div className="text-2xl font-bold text-green-600">42%</div>
                    <div className="text-xs text-gray-600">Happy</div>
                </div>
                <div className="rounded-lg bg-blue-50/60 p-3 text-center backdrop-blur-md">
                    <div className="text-2xl font-bold text-blue-600">23%</div>
                    <div className="text-xs text-gray-600">Calm</div>
                </div>
                <div className="rounded-lg bg-yellow-50/60 p-3 text-center backdrop-blur-md">
                    <div className="text-2xl font-bold text-yellow-600">18%</div>
                    <div className="text-xs text-gray-600">Anxious</div>
                </div>
                <div className="rounded-lg bg-red-50/60 p-3 text-center backdrop-blur-md">
                    <div className="text-2xl font-bold text-red-600">17%</div>
                    <div className="text-xs text-gray-600">Sad</div>
                </div>
            </div>
        </div>
    )
}
