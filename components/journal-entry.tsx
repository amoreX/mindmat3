"use client";
import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

interface tempMood {
  label: string | null;
  journal: string | null;
}

export function JournalEntry() {
  const [entry, setEntry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [curr, setCurr] = useState<tempMood>({ label: null, journal: null });
  const { addMood, mood_history } = useUserStore();

  const handleSubmit = async () => {
    if (!entry.trim()) {
      toast("Entry is empty", {
        style: {
          color: "red",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await axios.post(
        "https://mindmate-host.onrender.com/predict",
        {
          prompt: entry,
        },
      );
      if (data) {
        setCurr({ label: data.data.label, journal: entry });
      }
    } catch (err) {
      console.log(err);
      toast("Failed to analyze mood", {
        style: {
          color: "red",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const saveMood = async () => {
      if (curr.label && curr.journal) {
        console.log(curr);
        // Create the mood object with the correct structure
        const newMood = {
          journal: curr.journal,
          label: curr.label,
          date: new Date(),
        };

        try {
          await addMood(newMood);

          // Reset the form after successful submission
          setEntry("");
          setCurr({ label: null, journal: null });

          toast("Journal entry saved successfully!", {
            style: {
              color: "green",
            },
          });
        } catch (error) {
          console.error("Failed to save mood:", error);
          toast("Failed to save journal entry", {
            style: {
              color: "red",
            },
          });
        }
      }
    };

    saveMood();
  }, [curr, addMood]);

  return (
    <Card className="border-purple-100 bg-white/40 shadow-lg backdrop-blur-xl">
      <CardHeader className=" pb-4 backdrop-blur-xl">
        <CardTitle className="text-center text-2xl bg-transparent">
          Daily Journal
        </CardTitle>
        <CardDescription className="text-center">
          Write about your day, thoughts, or feelings and MindMate will provide
          personalized insights.
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
        <div className="text-sm text-muted-foreground">
          AI-powered insights will be generated after submission
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
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
  );
}
