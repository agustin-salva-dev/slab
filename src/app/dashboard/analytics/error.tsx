"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error("[ANALYTICS_PAGE_ERROR]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="rounded-full bg-my-accents-red/15 border border-my-accents-red p-3 mb-6">
        <AlertCircle size={32} className="text-my-accents-red" />
      </div>
      <h2 className="text-xl sm:text-2xl font-power-ultra text-my-accents-red mb-3">
        Oops! Something went wrong.
      </h2>
      <p className="text-my-secondary text-sm max-w-md mb-8">
        We couldn&apos;t load your Slab metrics right now. This might be due to
        a temporary connection issue or an internal error.
      </p>
      <Button
        variant="outline"
        onClick={() => {
          reset();
          router.refresh();
        }}
        subject="icon-text"
        className="font-medium bg-my-primary hover:bg-my-primary/80"
      >
        <RefreshCcw size={16} />
        Retry loading
      </Button>
    </div>
  );
}
