"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import {
  SquareArrowOutUpRight,
  Check,
  Copy,
  BadgeQuestionMark,
  Pen,
  BadgeMinus,
} from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface LinkCardProps {
  shortSlug: string;
  originalUrl: string;
  description?: string | null;
  createdAt: Date;
  clickCount: number;
}

export function LinkCard({
  shortSlug,
  originalUrl,
  description,
  createdAt,
  clickCount,
}: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullUrl = `${window.location.origin}/s/${shortSlug}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(createdAt));

  return (
    <Card className="w-full h-fit">
      <CardBody className="flex flex-col gap-y-2.5 sm:gap-y-3.5">
        <p className="block md:hidden font-power-ultra text-sm">{`${clickCount} clicks`}</p>
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <h3 className="text-lg md:text-[22px] font-power-ultra truncate">
              <span className="text-my-secondary pr-1">/</span>
              {shortSlug}
            </h3>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="text-my-secondary hover:text-white t-color cursor-pointer outline-none"
                  >
                    {copied ? (
                      <Check size={18} className="text-white" />
                    ) : (
                      <Copy
                        size={18}
                        className="text-my-secondary hover:text-white t-color cursor-pointer"
                        onClick={handleCopy}
                      />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy my link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <BadgeQuestionMark
              size={18}
              className="text-my-accents-yellow stroke-3"
            />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <p className="hidden md:block font-power-ultra text-md">{`${clickCount} clicks`}</p>
            <Separator orientation="vertical" className="h-5" />
            <a
              href={originalUrl}
              target="_blank"
              className="text-my-secondary hover:text-white t-color cursor-pointer"
            >
              <SquareArrowOutUpRight size={18} />
            </a>
            <Pen
              size={18}
              className="text-my-secondary hover:text-white t-color cursor-pointer"
            />
            <BadgeMinus
              size={18}
              className="text-my-secondary hover:text-white t-color cursor-pointer"
            />
          </div>
        </section>

        <span className="w-3/5 md:w-4/5 text-2.5 sm:text-xs md:text-sm text-my-secondary truncate">
          {originalUrl}
        </span>
        <div className="flex justify-between">
          <p className="w-4/6 md:w-4/5 text-xs sm:text-sm md:text-md text-my-secondary">
            {description || ""}
          </p>

          <p className="text-2.5 sm:text-xs md:text-sm text-my-secondary">
            {formattedDate}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
