import { Search } from "lucide-react";
import type { VariantProps } from "tailwind-variants";
import { tv, cn } from "@/utils/tailwind";

const searchBarVariants = tv({
    base: [
        "border-input bg-background ring-offset-background flex w-full border items-center",
        "focus-within:border-my-secondary focus-within:ring-offset-1",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
    ],
    variants: {
        inputSize: {
            xs: "rounded-1-5 h-8 px-2 gap-2.5",
            sm: "rounded-2 h-9 px-2.5 gap-2.5",
            md: "rounded-2 h-10 px-3 gap-2.5",
            lg: "rounded-2.5 h-11 px-3.5 gap-2.5",
        },
    },
    defaultVariants: {
        inputSize: "md",
    },
});

function SearchBar({
    className,
    inputSize,
    ...props
}: React.ComponentProps<"input"> & VariantProps<typeof searchBarVariants>) {
    return (
        <div className={cn(searchBarVariants({ inputSize, className }))}>
            <Search
                size={16}
                className="text-muted-foreground"
            />

            <input
                className={cn(
                    "placeholder:text-muted-foreground w-full bg-transparent outline-hidden border-none p-0",
                    "text-3.5"
                )}
                {...props}
            />
        </div>
    );
}

export { SearchBar };