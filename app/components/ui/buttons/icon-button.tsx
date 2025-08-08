import { cn } from "@/app/lib/cn";
import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"button"> & {
  size?: "sm" | "md" | "lg";
};
export default function IconButton({ className, children, size }: Props) {
  const styles = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };

  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer rounded-full text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black",
        className,
        size && styles[size],
      )}
    >
      {children}
    </button>
  );
}
