"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

type optionsTypes = { createdAt: Date, teacher: string, title: string, updatedAt: Date, _id: string}

type Props = {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  subjects: string[];
  setSubjects:React.Dispatch<React.SetStateAction<string[]>>;
  options: optionsTypes[]
};

export function MultiSelect({ options, value, setValue, setSubjects, subjects }: Props) {
  const toggleValue = (teacherId: string, subjectId: string) => {
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
          {value.length > 0
            ? `${value.length} selected`
            : "Select items"}
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
              <Checkbox checked={value.includes(opt?.teacher?._id)} />
              <span>{opt.title} ({opt?.teacher?.name})</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}