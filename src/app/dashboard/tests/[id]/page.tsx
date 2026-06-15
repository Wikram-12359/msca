// app/dashboard/tests/[id]/page.tsx
"use client";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LatexRenderer } from "@/components/admin/LatexRenderer";
import { toast } from "sonner";
import api from "@/lib/axios";

const OPTION_LABELS = ["A", "B", "C", "D"];

type Question = { text: string; options: string[] };
type TestData = {
  _id: string;
  title: string;
  duration: number;
  marksPerQuestion: number;
  negativeMarking: number;
  questions: Question[];
};
type Result = {
  score: number;
  total: number;
  percentage: number;
  correct: number;
  wrong: number;
  skipped: number;
  results: { selected: number; correct: number; isCorrect: boolean; isSkipped: boolean }[];
  questions: { text: string; options: string[] }[];
};

export default function TestAttemptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [test, setTest] = useState<TestData | null>(null);
  const [attempted, setAttempted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [violations, setViolations] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch test
  useEffect(() => {
    async function loadTest() {
      const response = await api.get<TestData & { attempted?: boolean }>(`/tests/${id}`);
      const data = response.data;
      console.log(data);
      setTest(data);
      setAttempted(Boolean(data?.attempted));
      setAnswers(new Array(data?.questions.length).fill(-1));
      setTimeLeft(data?.duration * 60);
      setLoading(false);
    }

    loadTest();
  }, [id]);

  const handleSubmit = useCallback(async () => {
    if (submitting || submitted) return;
    setSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const response = await api.post(`/tests/${id}/submit`, { answers });
      setResult(response.data as Result);
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  }, [answers, id, submitted, submitting]);

  // Countdown timer
  useEffect(() => {
    if (!test || submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [test, submitted, handleSubmit]);

  // Tab switch detection
  useEffect(() => {
    if (submitted) return;

    function handleVisibility() {
      if (document.hidden) {
        setViolations((v) => {
          const next = v + 1;
          if (next >= 3) {
            toast.error("Test auto-submitted: too many tab switches.");
            handleSubmit();
          } else {
            toast.warning(`Warning ${next}/3: do not switch tabs during the test.`);
          }
          return next;
        });
      }
    }

    function handleContextMenu(e: MouseEvent) {
      e.preventDefault();
      toast.warning("Right-click is disabled during the test.");
    }

    function handleKeyDown(e: KeyboardEvent) {
      // Block common shortcuts
      if (
        (e.ctrlKey && ["c", "v", "u", "s", "a"].includes(e.key.toLowerCase())) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [submitted, handleSubmit]);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  const answered = answers.filter((a) => a !== -1).length;

  if (loading) return <p className="p-6">Loading test...</p>;
  if (!test) return <p className="p-6">Test not found.</p>;
  if (attempted && !submitted) {
    return (
      <div className="p-6 space-y-4 rounded-lg border bg-background">
        <h1 className="text-2xl font-semibold">Test already submitted</h1>
        <p className="text-sm text-muted-foreground">
          You have already completed this test. You cannot attempt it again.
        </p>
        <Button onClick={() => router.push("/dashboard")}>Back to dashboard</Button>
      </div>
    );
  }

  // Results screen
  if (submitted && result) {
    return (
      <div className=" mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-medium">{test?.title}</h1>
          <p className="text-5xl font-medium text-emerald-600">{result?.percentage}%</p>
          <p className="text-muted-foreground">
            {result?.score} / {result?.total} marks
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-medium text-emerald-700">{result.correct}</p>
            <p className="text-xs text-emerald-600">Correct</p>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3 text-center">
            <p className="text-2xl font-medium text-red-700">{result.wrong}</p>
            <p className="text-xs text-red-600">Wrong</p>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-2xl font-medium">{result.skipped}</p>
            <p className="text-xs text-muted-foreground">Skipped</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium">Review answers</h2>
          {result?.questions?.map((q, i) => {
            const r = result.results[i];
            return (
              <Card
                key={i}
                className={`border ${
                  r.isSkipped
                    ? "border-border"
                    : r.isCorrect
                    ? "border-emerald-400"
                    : "border-red-400"
                }`}
              >
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge
                      variant={
                        r.isSkipped ? "secondary" : r.isCorrect ? "default" : "destructive"
                      }
                      className="text-xs mt-0.5"
                    >
                      {r.isSkipped ? "Skipped" : r.isCorrect ? "Correct" : "Wrong"}
                    </Badge>
                    <p className="text-sm">
                      <LatexRenderer>{q.text}</LatexRenderer>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, j) => (
                      <div
                        key={j}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-sm ${
                          j === r.correct
                            ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"
                            : j === r.selected && !r.isCorrect
                            ? "border-red-400 bg-red-50 dark:bg-red-950/20"
                            : "border-border"
                        }`}
                      >
                        <span className="text-xs font-medium text-muted-foreground w-4">
                          {OPTION_LABELS[j]}
                        </span>
                        <LatexRenderer>{opt}</LatexRenderer>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Button onClick={() => router.push("/dashboard")} className="w-full">
          Back to dashboard
        </Button>
      </div>
    );
  }

  const q = test.questions[current];

  // Test attempt screen
  return (
    <div className="  p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium">{test.title}</h1>
          <p className="text-xs text-muted-foreground">
            {answered}/{test.questions.length} answered
            {violations > 0 && (
              <span className="text-red-500 ml-2">· {violations}/3 warnings</span>
            )}
          </p>
        </div>
        <div
          className={`text-lg font-medium tabular-nums ${
            timeLeft < 60 ? "text-red-500" : "text-foreground"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${(answered / test.questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card>
        <CardContent className="pt-5 space-y-5">
          <div className="flex items-start gap-3">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded shrink-0">
              Q{current + 1}
            </span>
            <p className="text-sm leading-relaxed">
              <LatexRenderer>{q.text}</LatexRenderer>
            </p>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const updated = [...answers];
                  updated[current] = i;
                  setAnswers(updated);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-colors ${
                  answers[current] === i
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors ${
                    answers[current] === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {OPTION_LABELS[i]}
                </span>
                <LatexRenderer>{opt}</LatexRenderer>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
        >
          Previous
        </Button>

        <div className="flex gap-1 flex-wrap max-w-xs justify-center">
          {test.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-7 h-7 rounded text-xs transition-colors ${
                i === current
                  ? "bg-primary text-primary-foreground"
                  : answers[i] !== -1
                  ? "bg-emerald-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current < test.questions.length - 1 ? (
          <Button onClick={() => setCurrent((p) => p + 1)}>Next</Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {submitting ? "Submitting..." : "Submit test"}
          </Button>
        )}
      </div>
    </div>
  );
}