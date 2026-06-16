import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("@/server/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock("@/inngest/client", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/inngest/client")>();
  original.inngest.send = vi.fn().mockResolvedValue({ ids: ["event-id"] });
  return original;
});

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers({
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "x-vercel-ip-country": "US",
  })),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn().mockImplementation((url) => {
    throw new Error(`Redirected to: ${url}`);
  }),
  notFound: vi.fn().mockImplementation(() => {
    throw new Error("NextNotFound");
  }),
}));
