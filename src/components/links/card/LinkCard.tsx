"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { DeleteLinkModal } from "../modals/DeleteLinkModal";
import { EditLinkModal } from "../modals/EditLinkModal";
import { formatSmartDate } from "@/utils/formatSmartDate";
import { LinkStatusIcon } from "./LinkStatusIcon";
import { LinkActionTooltip } from "./LinkActionTooltip";
import { toast } from "sonner";
import {
  SquareArrowOutUpRight,
  Check,
  Copy,
  MousePointerClick,
  Bomb,
  Pen,
  BadgeMinus,
  BadgeQuestionMark,
  BadgeAlert,
} from "lucide-react";
import { Separator } from "@/components/ui/Separator";
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
  expiresAt?: Date | null;
  isActive: boolean;
}

export function LinkCard({
  id,
  shortSlug,
  originalUrl,
  description,
  createdAt,
  clickCount,
  status,
  expiresAt,
  isActive,
}: LinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCopy = async () => {
    if (!isActive) {
      toast.info("Link is deactivated", {
        description:
          "You need to enable this link before copying or sharing it.",
      });
      return;
    }

    const fullUrl = `${window.location.origin}/s/${shortSlug}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const formattedDate = formatSmartDate(new Date(createdAt));
  const formattedExpiration = expiresAt
    ? formatSmartDate(new Date(expiresAt))
    : null;

  return (
    <>
      <Card
        className={`w-full h-fit transition-all duration-300 ${!isActive ? "opacity-50 grayscale" : ""}`}
      >
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
            {/* LEFT SIDE: Slug, Copy Button, Status Icon */}
            <div className="w-4/6 flex items-center gap-2 md:gap-4">
              <h3 className="max-w-4/6 text-lg md:text-[22px] font-power-ultra wrap-break-word">
                <span className="text-my-secondary pr-1">/</span>
                {shortSlug}
              </h3>

              <LinkActionTooltip
                label="Copy my link"
                onClick={handleCopy}
                className="text-my-secondary hover:text-white cursor-pointer"
                icon={
                  copied ? (
                    <Check size={18} className="text-white" />
                  ) : (
                    <Copy size={18} />
                  )
                }
              />

              <LinkStatusIcon status={status} />
            </div>

            {/* RIGHT SIDE: Clicks, External Link, Edit, Delete */}
            <div className="flex items-center gap-2 md:gap-4">
              <LinkActionTooltip
                label={`${clickCount} clicks`}
                delayDuration={0}
                contentClassName="block md:hidden"
                className="flex items-center gap-2 cursor-pointer md:cursor-default"
                icon={
                  <>
                    <MousePointerClick size={18} className="text-white" />
                    <p className="hidden md:block font-power-ultra text-md">{`${clickCount} clicks`}</p>
                  </>
                }
              />

              <Separator orientation="vertical" className="h-5" />

              <LinkActionTooltip
                label="Go to destination"
                href={originalUrl}
                className="text-my-secondary hover:text-white cursor-pointer"
                icon={<SquareArrowOutUpRight size={18} />}
              />

              <LinkActionTooltip
                label="Edit link"
                onClick={() => setIsEditOpen(true)}
                className="text-my-secondary hover:text-white cursor-pointer"
                icon={<Pen size={18} />}
              />

              <LinkActionTooltip
                label="Delete link"
                onClick={() => setIsDeleteOpen(true)}
                className={`text-my-secondary ${isActive ? "hover:text-my-accents-red" : "hover:text-white"} cursor-pointer`}
                icon={<BadgeMinus size={18} />}
              />
            </div>
          </section>

          <span className="w-4/6 md:w-4/5 text-2.5 sm:text-xs md:text-sm text-my-secondary truncate">
            {originalUrl}
          </span>
          <div className="flex justify-between items-end gap-4">
            <div className="flex flex-col gap-2.5 w-4/6 md:w-4/5">
              <p className="text-xs sm:text-sm md:text-md text-my-secondary wrap-break-word">
                {description || ""}
              </p>
              {formattedExpiration && (
                <span
                  className={`flex items-center gap-1.5 text-2.5 sm:text-xs ${isActive ? "text-my-accents-yellow" : "text-white"}`}
                >
                  <Bomb size={13} />
                  {isActive ? "Expires " : "Expired "}
                  {formattedExpiration}
                </span>
              )}
            </div>

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
        link={{
          id,
          shortSlug,
          originalUrl,
          description: description ?? null,
          expiresAt: expiresAt ?? null,
          isActive,
        }}
      />
    </>
  );
}
