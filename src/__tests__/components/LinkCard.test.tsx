import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkCard } from "@/components/links/card/LinkCard";
import { LinkStatus } from "@prisma/client";

// Mock child modal components to avoid deep dependency tree
vi.mock("@/components/links/modals/DeleteLinkModal", () => ({
  DeleteLinkModal: () => null,
}));
vi.mock("@/components/links/modals/EditLinkModal", () => ({
  EditLinkModal: () => null,
}));
vi.mock("@/components/links/modals/DisableLinkModal", () => ({
  DisableLinkModal: () => null,
}));

const baseProps = {
  id: "test-id-123",
  shortSlug: "my-link",
  originalUrl: "https://example.com/very-long-url",
  description: "A test description",
  createdAt: new Date("2024-06-15T12:00:00Z"),
  clickCount: 42,
  status: LinkStatus.VERIFIED,
  expiresAt: null,
  isActive: true,
  tags: [],
};

describe("LinkCard", () => {
  it("renders the shortSlug", () => {
    render(<LinkCard {...baseProps} />);
    expect(screen.getByText("my-link")).toBeInTheDocument();
  });

  it("renders the original URL", () => {
    render(<LinkCard {...baseProps} />);
    expect(screen.getByText("https://example.com/very-long-url")).toBeInTheDocument();
  });

  it("renders the click count", () => {
    render(<LinkCard {...baseProps} />);
    expect(screen.getByText("42 clicks")).toBeInTheDocument();
  });

  const inactiveCases = [
    { isActive: false, expectedClass: "opacity-35", label: "inactive link has opacity" },
  ];

  it.each(inactiveCases)(
    "$label",
    ({ isActive, expectedClass }) => {
      const { container } = render(<LinkCard {...baseProps} isActive={isActive} />);
      const card = container.querySelector(`.${expectedClass}`);
      expect(card).toBeInTheDocument();
    },
  );

  const calloutCases = [
    { status: LinkStatus.PENDING, expectedText: "Your link is being verified", label: "PENDING" },
    { status: LinkStatus.DANGEROUS, expectedText: "This link was rejected", label: "DANGEROUS" },
  ];

  it.each(calloutCases)(
    "shows warning callout for status $label",
    ({ status, expectedText }) => {
      render(<LinkCard {...baseProps} status={status} />);
      expect(screen.getByText(expectedText, { exact: false })).toBeInTheDocument();
    },
  );

  it("does not show any callout for VERIFIED status", () => {
    render(<LinkCard {...baseProps} status={LinkStatus.VERIFIED} />);
    expect(screen.queryByText("Your link is being verified")).not.toBeInTheDocument();
    expect(screen.queryByText("This link was rejected")).not.toBeInTheDocument();
  });

  it("renders the expiration date when expiresAt is provided", () => {
    render(<LinkCard {...baseProps} expiresAt={new Date("2024-12-25T00:00:00Z")} />);
    expect(screen.getByText(/Expires/)).toBeInTheDocument();
  });

  it("does not render expiration when expiresAt is null", () => {
    render(<LinkCard {...baseProps} expiresAt={null} />);
    expect(screen.queryByText(/Expires/)).not.toBeInTheDocument();
  });

  it("renders tag badges when tags are provided", () => {
    const tags = [
      { tag: { id: "t1", name: "Frontend", color: "--color-my-accents-blue" as const } },
      { tag: { id: "t2", name: "Urgent", color: "--color-my-accents-red" as const } },
    ];
    render(<LinkCard {...baseProps} tags={tags} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });
});
