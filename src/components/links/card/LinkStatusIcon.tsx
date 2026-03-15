import { BadgeCheck, BadgeAlert, BadgeQuestionMark } from "lucide-react";
import { LinkStatus } from "@prisma/client";

interface LinkStatusIconProps {
  status: LinkStatus;
}

export function LinkStatusIcon({ status }: LinkStatusIconProps) {
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
