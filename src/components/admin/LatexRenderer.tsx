// components/LatexRenderer.tsx
"use client";
import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type Props = {
  children: string;
  className?: string;
};

export function LatexRenderer({ children, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !children) return;

    // Split text by $...$ and $$...$$ delimiters and render each part
    const el = ref.current;
    el.innerHTML = "";

    const parts = children.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g);

    parts.forEach((part) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        const math = part.slice(2, -2);
        const span = document.createElement("span");
        try {
          katex.render(math, span, { throwOnError: false, displayMode: true });
        } catch {
          span.textContent = part;
        }
        el.appendChild(span);
      } else if (part.startsWith("$") && part.endsWith("$")) {
        const math = part.slice(1, -1);
        const span = document.createElement("span");
        try {
          katex.render(math, span, { throwOnError: false, displayMode: false });
        } catch {
          span.textContent = part;
        }
        el.appendChild(span);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }, [children]);

  if (!children) return null;

  return <span ref={ref} className={className} />;
}