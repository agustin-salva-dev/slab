import { cn } from "@/utils/tailwind";
import type { ElementType, ReactNode } from "react";

interface AnalyticsCardProps {
  title: ReactNode;
  icon: ElementType;
  iconClassName?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AnalyticsCard({
  title,
  icon: Icon,
  iconClassName,
  headerAction,
  children,
  className,
}: AnalyticsCardProps) {
  return (
    <section
      className={cn(
        "min-w-0 w-full rounded-3 border border-my-border-primary bg-my-primary/50 p-5 sm:p-7",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1">
          <Icon
            size={20}
            className={cn("text-my-accents-purple", iconClassName)}
          />
          <h2 className="font-power-ultra text-base sm:text-lg text-white">
            {title}
          </h2>
        </div>
        {headerAction}
      </div>
      {children}
    </section>
  );
}
