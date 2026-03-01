"use client";

import { useTransition } from "react";
import { SettingsCard } from "./SettingsCard";
import { parseOS, isMobileOS } from "./utils";
import { Button } from "@/components/ui/Button";
import {
  MonitorSmartphone,
  Laptop,
  Ban,
  Loader2,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import {
  revokeSessionByToken,
  revokeOtherSessions,
} from "@/server/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoutModal } from "@/components/auth/LogoutModal";

export type SessionResponse = {
  id: string;
  token: string;
  userAgent?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function SecuritySettings({
  sessions,
  currentSessionToken,
}: {
  sessions: SessionResponse[];
  currentSessionToken: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const handleRevoke = (token: string) => {
    startTransition(async () => {
      const resp = await revokeSessionByToken(token);
      if (resp.success) {
        toast.success("Device session revoked successfully.");
        router.refresh();
      } else {
        toast.error(resp.error || "Failed to revoke session.");
      }
    });
  };

  const handleRevokeAllOther = () => {
    startTransition(async () => {
      const resp = await revokeOtherSessions();
      if (resp.success) {
        toast.success("All other devices have been logged out.");
        router.refresh();
      } else {
        toast.error(resp.error || "Failed to log out other devices.");
      }
    });
  };

  const currentSession = sessions.find((s) => s.token === currentSessionToken);
  const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);

  const renderSessionItem = (sess: SessionResponse, isCurrent: boolean) => {
    const os = parseOS(sess.userAgent);
    const isMobile = isMobileOS(os);

    return (
      <li
        key={sess.id}
        className="flex flex-col md:flex-row gap-4 md:gap-0 items-end justify-between border border-my-border-secondary/30 rounded-2 p-3 bg-white/5"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-my-border-secondary/50 rounded-1 shadow-inner">
            {isMobile ? (
              <MonitorSmartphone size={20} className="text-white" />
            ) : (
              <Laptop size={20} className="text-white" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-power-med text-white">
              {isCurrent ? "This Device" : "Logged-in Device"}
            </span>
            <span className="text-xs text-my-secondary">
              Logged in via {os}{" "}
              {sess.createdAt &&
                `· Started at ${new Date(sess.createdAt).toLocaleDateString()}`}
            </span>
          </div>
        </div>

        {isCurrent ? (
          <Button
            variant="outline"
            size="sm"
            subject="text-icon"
            className="cursor-pointer"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            Log out
            <LogOut size={14} />
          </Button>
        ) : (
          <Button
            variant="destructive-outline"
            size="sm"
            subject="icon-text"
            className="cursor-pointer"
            onClick={() => handleRevoke(sess.token)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Ban size={14} />
            )}
            Log out device
          </Button>
        )}
      </li>
    );
  };

  return (
    <>
      <SettingsCard
        title="Security"
        description="Manage your active sessions and devices:"
      >
        <div className="flex flex-col gap-6">
          {/* Current Active Session */}
          {currentSession && (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-power-med text-white flex items-center gap-2">
                Current Session
              </h3>
              <ul className="flex flex-col gap-3">
                {renderSessionItem(currentSession, true)}
              </ul>
            </div>
          )}

          {/* Other Sessions */}
          {otherSessions.length > 0 && (
            <div className="flex flex-col gap-3 pt-6 border-t border-my-border-secondary/30">
              <div className="flex flex-row items-center justify-between">
                <h3 className="text-sm font-power-med text-white flex items-center gap-2">
                  Other Devices
                </h3>
                <Button
                  variant="destructive-outline"
                  size="xs"
                  subject="icon-text"
                  className="cursor-pointer"
                  onClick={handleRevokeAllOther}
                  disabled={isPending}
                >
                  <ShieldAlert size={14} />
                  Sign out of all other devices
                </Button>
              </div>
              <ul className="flex flex-col gap-3">
                {otherSessions.map((sess) => renderSessionItem(sess, false))}
              </ul>
            </div>
          )}
        </div>
      </SettingsCard>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
