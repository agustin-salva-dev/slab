import type { VariantProps } from "tailwind-variants";

import { cn, tv } from "@/utils/tailwind";

const badgeVariants = tv({
  base: "text-3.5 inline-flex h-7 items-center rounded-2 px-2.5 font-medium",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "text-foreground border",
      destructive: "bg-destructive text-destructive-foreground",
      "destructive-outline":
        "border-destructive-border text-destructive-foreground border",
      warning: "bg-warning text-warning-foreground",
      "warning-outline": "border-warning-border text-warning-foreground border",
      success: "bg-success text-success-foreground",
      "success-outline": "border-success-border text-success-foreground border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.ComponentProps<"div">, VariantProps<typeof badgeVariants> {
  dynamicColor?: string | null;
}

function Badge({
  className,
  variant,
  dynamicColor,
  style,
  ...props
}: BadgeProps) {
  if (dynamicColor) {
    return (
      <div
        className={cn(
          badgeVariants({ variant: "outline", className }),
          "border-(--tag-color) bg-(--tag-color)/20 text-(--tag-color)",
        )}
        style={
          {
            ...style,
            "--tag-color": `var(${dynamicColor})`,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(badgeVariants({ variant, className }))}
      style={style}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
