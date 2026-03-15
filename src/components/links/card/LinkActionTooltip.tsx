import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface LinkActionTooltipProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  delayDuration?: number;
  contentClassName?: string;
}

export function LinkActionTooltip({
  label,
  icon,
  onClick,
  href,
  className = "",
  disabled = false,
  delayDuration,
  contentClassName,
}: LinkActionTooltipProps) {
  const commonClasses = `t-color outline-none ${className}`;

  const triggerBody = href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={commonClasses}
      aria-label={label}
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        if (onClick) onClick();
      }}
    >
      {icon}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={commonClasses}
      aria-label={label}
      disabled={disabled}
    >
      {icon}
    </button>
  );

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip disableHoverableContent={delayDuration === 0}>
        <TooltipTrigger asChild>{triggerBody}</TooltipTrigger>
        <TooltipContent
          className={contentClassName}
          sideOffset={delayDuration === 0 ? 10 : undefined}
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
