/**
 * Application-level link types.
 * Defined independently from Prisma to prevent its Node.js-only client
 * from being bundled into client-side components.
 */
export type LinkStatus = "PENDING" | "VERIFIED" | "DANGEROUS";

export interface LinkTag {
  tag: {
    id: string;
    name: string;
    color: string | null;
  };
}

export interface LinkCardData {
  id: string;
  shortSlug: string;
  originalUrl: string;
  description: string | null;
  createdAt: Date;
  clickCount: number;
  status: LinkStatus;
  expiresAt: Date | null;
  isActive: boolean;
  tags: LinkTag[];
}
