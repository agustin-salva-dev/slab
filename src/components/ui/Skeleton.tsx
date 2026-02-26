import React from "react";
import { cn } from "@/utils/tailwind";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-1-5 bg-my-hover animate-pulse", className)}
      {...props}
    />
  );
}

export { Skeleton };
