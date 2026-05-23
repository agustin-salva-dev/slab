import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LinkStatusIcon } from "@/components/links/card/LinkStatusIcon";
import { LinkStatus } from "@prisma/client";

const statusCases = [
  { status: LinkStatus.VERIFIED, expectedClass: "text-my-accents-blue", label: "VERIFIED" },
  { status: LinkStatus.DANGEROUS, expectedClass: "text-my-accents-red", label: "DANGEROUS" },
  { status: LinkStatus.PENDING, expectedClass: "text-my-accents-yellow", label: "PENDING" },
];

describe("LinkStatusIcon", () => {
  it.each(statusCases)(
    "renders the correct icon with class '$expectedClass' for status $label",
    ({ status, expectedClass }) => {
      const { container } = render(<LinkStatusIcon status={status} />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass(expectedClass);
    },
  );
});
