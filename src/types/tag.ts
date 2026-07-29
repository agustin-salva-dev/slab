/**
 * Application-level Tag type definition.
 * Decoupled from Prisma to prevent pulling Node.js-only client code
 * into browser bundles.
 */
export interface Tag {
  id: string;
  name: string;
  color: string | null;
  createdAt: Date;
}
