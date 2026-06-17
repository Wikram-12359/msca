// app/admin/tests/create/page.tsx
"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LatexRenderer } from "@/components/admin/LatexRenderer";
import { useAdminCourses } from "@/hooks/use-course-admin";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";

const LATEX_SNIPPETS = [
  { label: "frac", val: "\\frac{}{}" },
  { label: "sqrt", val: "\\sqrt{}" },
  { label: "x²", val: "^{2}" },
  { label: "∑", val: "\\sum_{}^{}" },
  { label: "∫", val: "\\int_{}^{}" },
  { label: "π", val: "\\pi" },
  { label: "α", val: "\\alpha" },
  { label: "β", val: "\\beta" },
  { label: "θ", val: "\\theta" },
  { label: "±", val: "\\pm" },
  { label: "≠", val: "\\neq" },
  { label: "≤", val: "\\leq" },
  { label: "≥", val: "\\geq" },
  { label: "→", val: "\\rightarrow" },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

type Question = {
  text: string;
  options: string[];
  correct: number;
};

function insertAtCursor(
  ref: React.RefObject<HTMLTextAreaElement | null>,
  snippet: string,
  onChange: (val: string) => void
) {
  const el = ref.current;
  if (!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const val = el.value;
  const newVal = val.slice(0, start) + "$" + snippet + "$" + val.slice(end);
  onChange(newVal);
  setTimeout(() => {
    el.focus();
    el.selectionStart = el.selectionEnd = start + snippet.length + 2;
  }, 0);
}

export function QuestionEditor({
  question,
  index,
  onChange,
  onRemove,
}: {
  question: Question;
  index: number;
  onChange: (q: Question) => void;
  onRemove: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Question {index + 1}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="edit">
          <TabsList className="h-8">
            <TabsTrigger value="edit" className="text-xs">Edit</TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-3 space-y-3">
            {/* LaTeX toolbar */}
            <div className="flex flex-wrap gap-1">
              {LATEX_SNIPPETS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() =>
                    insertAtCursor(textareaRef, s.val, (val) =>
                      onChange({ ...question, text: val })
                    )
                  }
                  className="px-2 py-0.5 text-xs font-mono border rounded hover:bg-muted"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Question text · wrap LaTeX with $…$ or $$…$$
              </Label>
              <Textarea
                ref={textareaRef}
                value={question?.text}
                onChange={(e) => onChange({ ...question, text: e.target.value })}
                placeholder="e.g. What is the value of $\frac{d}{dx}(x^2)$?"
                rows={3}
                className="font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {OPTION_LABELS.map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ ...question, correct: i })}
                    className={`w-7 h-7 rounded-full text-xs font-medium flex-shrink-0 border transition-colors ${
                      question?.correct === i
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-border text-muted-foreground hover:border-emerald-400"
                    }`}
                    title="Mark as correct"
                  >
                    {label}
                  </button>
                  <Input
                    value={question?.options[i]}
                    onChange={(e) => {
                      const opts = [...question.options];
                      opts[i] = e.target.value;
                      onChange({ ...question, options: opts });
                    }}
                    placeholder={`Option ${label}`}
                    className="text-sm h-8"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-3 space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              {question?.text ? (
                <LatexRenderer>{question?.text}</LatexRenderer>
              ) : (
                <span className="text-muted-foreground italic">No question text yet.</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {OPTION_LABELS.map((label, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-sm ${
                    question?.correct === i
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"
                      : "border-border"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-xs flex items-center justify-center flex-shrink-0 ${
                      question?.correct === i
                        ? "bg-emerald-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  {question?.options[i] ? (
                    <LatexRenderer>{question?.options[i]}</LatexRenderer>
                  ) : (
                    <span className="text-muted-foreground italic text-xs">Empty</span>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}





export default function CreateTestPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: courses } = useAdminCourses();
  console.log(courses);

  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [duration, setDuration] = useState(60);
  const [marksPerQuestion, setMarksPerQuestion] = useState(1);
  const [negativeMarking, setNegativeMarking] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [saving, setSaving] = useState(false);

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      { text: "", options: ["", "", "", ""], correct: 0 },
    ]);
  }

  function updateQuestion(index: number, q: Question) {
    setQuestions((prev) => prev.map((old, i) => (i === index ? q : old)));
  }

  function removeQuestion(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!title.trim()) return toast.error("Enter a test title.");
    if (!courseId) return toast.error("Select a course.");
    if (!questions.length) return toast.error("Add at least one question.");

    const invalid = questions.find(
      (q) => !q.text.trim() || q.options.some((o) => !o.trim())
    );
    if (invalid) return toast.error("Fill in all question text and options.");

    setSaving(true);
    try {
      const test = await api.post("/tests", {
        title,
        course: courseId,
        duration,
        marksPerQuestion,
        negativeMarking,
        questions,
      });
      toast.success("Test saved!");
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      // router.push("/admin/tests");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save test.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Create test</h1>
          <p className="text-sm text-muted-foreground">
            {questions.length} questions · {questions.length * marksPerQuestion} total marks
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save test"}
        </Button>
      </div>

      {/* Settings */}
      <Card>
        <CardContent className="pt-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Biology Ch.3 Test"
              />
            </div>
            <div className="space-y-1">
              <Label>Course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course..." />
                </SelectTrigger>
                <SelectContent>
                  {courses?.map((c: any) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <Label>Marks per question</Label>
              <Input
                type="number"
                min={1}
                value={marksPerQuestion}
                onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <Label>Negative marking</Label>
              <Select
                value={String(negativeMarking)}
                onValueChange={(v) => setNegativeMarking(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="0.25">−¼ per wrong</SelectItem>
                  <SelectItem value="0.5">−½ per wrong</SelectItem>
                  <SelectItem value="1">−1 per wrong</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Questions</h2>
          <Button variant="outline" size="sm" onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-1" /> Add question
          </Button>
        </div>

        {questions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm border rounded-lg">
            No questions yet. Click "Add question" to start.
          </div>
        )}

        {questions.map((q, i) => (
          <QuestionEditor
            key={i}
            question={q}
            index={i}
            onChange={(updated) => updateQuestion(i, updated)}
            onRemove={() => removeQuestion(i)}
          />
        ))}

        {questions.length > 0 && (
          <Button variant="outline" className="w-full" onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-1" /> Add another question
          </Button>
        )}
      </div>
    </div>
  );
}
