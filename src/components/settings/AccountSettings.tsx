"use client";

import { useState } from "react";
import { SettingsCard } from "./SettingsCard";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Download, Trash2, Loader2 } from "lucide-react";
import { exportUserData } from "@/server/actions/user";
import { downloadJson } from "@/utils/download";
import { toast } from "sonner";
import { DeleteAccountModal } from "./DeleteAccountModal";

export function AccountSettings({ userEmail }: { userEmail: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const toastId = toast.loading("Preparing your data export...");

    try {
      const response = await exportUserData();

      if (response.success && response.data) {
        const fileName = `slab-export-${new Date().toISOString().split("T")[0]}.json`;
        downloadJson(response.data, fileName);

        toast.success("Data exported successfully!", { id: toastId });
      } else {
        toast.error(response.error || "Failed to export data.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("[EXPORT_ERROR]", error);
      toast.error("Unexpected error exporting data.", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <SettingsCard
        title="Account"
        description="Update your account settings:"
        bodyClassName="gap-8"
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm">Export links:</p>
          <Button
            variant="outline"
            size="sm"
            subject="icon-text"
            className="w-fit cursor-pointer"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            Export all links
          </Button>
        </div>

        <Separator className="bg-my-border-secondary/30" />

        <div className="flex flex-col gap-2">
          <p className="text-sm text-my-accents-red">Danger Zone:</p>
          <Button
            variant="destructive-outline"
            size="sm"
            subject="icon-text"
            className="w-fit cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Trash2 size={16} />
            Delete Account
          </Button>
        </div>
      </SettingsCard>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={userEmail}
      />
    </>
  );
}
