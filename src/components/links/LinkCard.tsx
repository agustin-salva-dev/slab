"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { DeleteLinkModal } from "./DeleteLinkModal";
import { EditLinkModal } from "./EditLinkModal";
import {
  SquareArrowOutUpRight,
  Check,
  Copy,
  BadgeQuestionMark,
  BadgeAlert,
  BadgeCheck,
  Pen,
  BadgeMinus,
  MousePointerClick,
} from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Callout, CalloutText } from "@/components/ui/Callout";
import { LinkStatus } from "@prisma/client";

interface LinkCardProps {
  id: string;
  shortSlug: string;
  originalUrl: string;
  description?: string | null;
  createdAt: Date;
  clickCount: number;
  status: LinkStatus;
}

export function LinkCard({
  id,
  shortSlug,
  originalUrl,
  description,
  createdAt,
  clickCount,
  status,
}: LinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  const statusBadgeIcon = (() => {
    if (status === LinkStatus.VERIFIED) {
      return (
        <BadgeCheck
          size={20}
          strokeWidth={2.5}
          className="text-my-accents-blue"
        />
      );
    }
    if (status === LinkStatus.DANGEROUS) {
      return (
        <BadgeAlert
          size={20}
          strokeWidth={2.5}
          className="text-my-accents-red"
        />
      );
    }
    return (
      <BadgeQuestionMark
        size={20}
        strokeWidth={2.5}
        className="text-my-accents-yellow"
      />
    );
  })();

  return (
    <>
      <Card className="w-full h-fit">
        <CardBody className="flex flex-col gap-y-2.5 sm:gap-y-3.5">
          {status === LinkStatus.PENDING && (
            <Callout variant="warning">
              <BadgeQuestionMark size={20} />
              <CalloutText>
                Your link is being verified, it may take a moment.
              </CalloutText>
            </Callout>
          )}
          {status === LinkStatus.DANGEROUS && (
            <Callout variant="destructive">
              <BadgeAlert size={20} />
              <CalloutText>
                This link was rejected. It may contain unsafe content.
              </CalloutText>
            </Callout>
          )}
          <section className="flex justify-between items-center">
            <div className="w-4/6 flex items-center gap-2 md:gap-4">
              <h3 className="max-w-4/6 text-lg md:text-[22px] font-power-ultra wrap-break-word">
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

              {statusBadgeIcon}
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip disableHoverableContent>
                  <TooltipTrigger
                    asChild
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <button className="flex items-center gap-2 cursor-pointer md:cursor-default outline-none">
                      <MousePointerClick size={18} className="text-white" />
                      <p className="hidden md:block font-power-ultra text-md">{`${clickCount} clicks`}</p>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="block md:hidden" sideOffset={10}>
                    <p>{clickCount} clicks</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Separator orientation="vertical" className="h-5" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={originalUrl}
                      target="_blank"
                      className="text-my-secondary hover:text-white t-color cursor-pointer outline-none"
                    >
                      <SquareArrowOutUpRight size={18} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to destination</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsEditOpen(true)}
                      className="text-my-secondary hover:text-white t-color cursor-pointer outline-none"
                    >
                      <Pen size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit link</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsDeleteOpen(true)}
                      className="text-my-secondary hover:text-my-accents-red t-color cursor-pointer outline-none"
                    >
                      <BadgeMinus size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </section>

          <span className="w-4/6 md:w-4/5 text-2.5 sm:text-xs md:text-sm text-my-secondary truncate">
            {originalUrl}
          </span>
          <div className="flex justify-between items-end gap-4">
            <p className="w-4/6 md:w-4/5 text-xs sm:text-sm md:text-md text-my-secondary wrap-break-word">
              {description || ""}
            </p>

            <p className="text-2.5 sm:text-xs md:text-sm text-my-secondary shrink-0 whitespace-nowrap">
              {formattedDate}
            </p>
          </div>
        </CardBody>
      </Card>
      <DeleteLinkModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        linkId={id}
        shortSlug={shortSlug}
      />
      <EditLinkModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        link={{ id, shortSlug, originalUrl, description: description ?? null }}
      />
    </>
  );
}
