"use client";

import { cn } from "@/app/lib/cn";
import { useEffect, useState } from "react";

interface CodeArtifact {
  id: number;
  code: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  opacity: number;
  color: string;
}

const codeSnippets = [
  "useState()",
  "useEffect(() => {}, [])",
  "<Component />",
  "const [state, setState]",
  "props.children",
  "onClick={handleClick}",
  "useCallback()",
  "useMemo(() => {})",
  "useContext()",
  "return (",
  "export default",
  "import React",
  "className={}",
  "key={index}",
  "map((item) =>",
  "...spread",
  "{ destructure }",
  "=> arrow",
  "async/await",
  "try { catch }",
  ".then()",
  "fetch()",
  "JSON.stringify",
  "localStorage",
  "document.querySelector",
  "addEventListener",
  "setTimeout()",
  "console.log()",
  "if (condition)",
  "for (let i = 0)",
  "Array.from()",
  ".filter()",
  ".reduce()",
  "Object.keys()",
  "typeof",
  "instanceof",
  "new Promise()",
  "Math.random()",
  "Date.now()",
  "parseInt()",
  "JSON.parse()",
];

const colors = [
  "text-cyan-400",
  "text-blue-400",
  "text-purple-400",
  "text-green-400",
  "text-yellow-400",
  "text-pink-400",
  "text-indigo-400",
  "text-teal-400",
];

export function FloatingCodeArtifacts({ ref }) {
  const [artifacts, setArtifacts] = useState<CodeArtifact[]>([]);

  useEffect(() => {
    // Generate initial artifacts
    const initialArtifacts: CodeArtifact[] = [];

    for (let i = 0; i < 25; i++) {
      initialArtifacts.push({
        id: i,
        code: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 0.5 + 0.5, // 0.5 to 1
        speed: Math.random() * 2 + 0.5, // 0.5 to 2.5
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setArtifacts(initialArtifacts);

    // Animation loop
    const animateArtifacts = () => {
      setArtifacts((prev) =>
        prev.map((artifact) => {
          let newX = artifact.x - artifact.speed;
          let newY = artifact.y + Math.sin(artifact.x * 0.01) * 0.5;
          let newRotation = artifact.rotation + 0.5;

          // Reset position when artifact goes off screen
          if (newX < -200) {
            newX = window.innerWidth + 100;
            newY = Math.random() * window.innerHeight;
          }

          return {
            ...artifact,
            x: newX,
            y: newY,
            rotation: newRotation,
          };
        }),
      );
    };

    const interval = setInterval(animateArtifacts, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="artifacts pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-0"
      ref={ref}
    >
      {artifacts.map((artifact) => (
        <div
          key={artifact.id}
          className={cn(
            "absolute font-mono text-xs whitespace-nowrap select-none",
            artifact.color,
          )}
          style={{
            left: `${artifact.x}px`,
            top: `${artifact.y}px`,
            transform: `rotate(${artifact.rotation}deg) scale(${artifact.size})`,
            opacity: artifact.opacity,
            transition: "none",
          }}
        >
          {artifact.code}
        </div>
      ))}
    </div>
  );
}
