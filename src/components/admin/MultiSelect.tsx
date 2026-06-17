"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type OptionType = {
  _id: string;
  title: string;
  teacher?: {
    _id: string;
    name: string;
  };
};

type Props = {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  subjects: string[];
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  options: OptionType[];
};

export function MultiSelect({ options, value, setValue, setSubjects, subjects }: Props) {
  const toggleValue = (teacherId: string | undefined, subjectId: string) => {
    if (!teacherId) return; // ← guard against undefined teacher

    setSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((v) => v !== subjectId)
        : [...prev, subjectId]
    );

    setValue((prev) =>
      prev.includes(teacherId)
        ? prev.filter((v) => v !== teacherId)
        : [...prev, teacherId]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full max-w-64 justify-between">
          {value.length > 0 ? `${value.length} selected` : "Select items"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2">
        <div className="space-y-2">
          {options?.map((opt) => (
            <div
              key={opt._id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleValue(opt.teacher?._id, opt._id)}
            >
              <Checkbox
                checked={
                  !!opt.teacher?._id && value.includes(opt.teacher._id) // ← safe check
                }
              />
              <span>
                {opt.title} {opt.teacher?.name ? `(${opt.teacher.name})` : ""}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
