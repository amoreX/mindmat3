"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useUserStore } from "@/store/userStore";
export function Recommendations() {
  const { recommendations } = useUserStore();
  return (
    <Card className="border-purple-100 bg-white/40 shadow-lg backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
          Recommendations
        </CardTitle>
        <CardDescription>
          Personalized suggestions for your well-being
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="rounded-lg bg-green-50/60 p-4 backdrop-blur-md">
            <h4 className="font-medium text-green-800">Morning Mindfulness</h4>
            <p className="mt-1 text-sm text-gray-700">
              {/* {recommendations.map((each, ind) => {
                return <div className="flex flex-col">{each}</div>;
              })} */}
            </p>
          </li>

          <li className="rounded-lg bg-green-50/60 p-4 backdrop-blur-md">
            <h4 className="font-medium text-green-800">Thought Reframing</h4>
            <p className="mt-1 text-sm text-gray-700">
              Practice identifying and challenging negative thoughts by writing
              down alternative perspectives.
            </p>
          </li>

          <li className="rounded-lg bg-green-50/60 p-4 backdrop-blur-md">
            <h4 className="font-medium text-green-800">Evening Reflection</h4>
            <p className="mt-1 text-sm text-gray-700">
              End your day by noting three positive things that happened, no
              matter how small.
            </p>
          </li>

          <li className="rounded-lg bg-green-50/60 p-4 backdrop-blur-md">
            <h4 className="font-medium text-green-800">Social Connection</h4>
            <p className="mt-1 text-sm text-gray-700">
              Schedule a brief call or coffee with a friend this week. Social
              connection is vital for mental well-being.
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
