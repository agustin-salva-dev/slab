import { BadgeCheck, BadgeAlert, BadgeQuestionMark } from "lucide-react";
import type { LinkStatus } from "@/types/link";

interface LinkStatusIconProps {
  status: LinkStatus;
}

export function LinkStatusIcon({ status }: LinkStatusIconProps) {
  if (status === "VERIFIED") {
    return (
      <BadgeCheck
        size={20}
        strokeWidth={2.5}
        className="text-my-accents-blue"
      />
    );
  }

  if (status === "DANGEROUS") {
    return (
      <BadgeAlert size={20} strokeWidth={2.5} className="text-my-accents-red" />
    );
  }

  return (
    <BadgeQuestionMark
      size={20}
      strokeWidth={2.5}
      className="text-my-accents-yellow"
    />
  );
}
