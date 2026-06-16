import { vi } from "vitest";
import { auth } from "@/server/auth";

export function mockSession(user: { id: string; email: string; name: string | null } | null) {
  if (user) {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: user.id,
        email: user.email,
        emailVerified: true,
        name: user.name ?? "Test User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      session: {
        id: "session-123",
        userId: user.id,
        token: "token-123",
        expiresAt: new Date(Date.now() + 3600000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } else {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
  }
}
