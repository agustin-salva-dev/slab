"use client";

import { useTransition, useState } from "react";
import { SettingsCard } from "./SettingsCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Save, Mail, Loader2 } from "lucide-react";
import { updateUserName } from "@/server/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function GeneralSettings({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refetch } = authClient.useSession();

  const handleSave = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (name === initialName) return;

    startTransition(async () => {
      const response = await updateUserName(name);

      if (response.success) {
        toast.success("Profile updated successfully!");
        await refetch();
        router.refresh();
      } else {
        toast.error(response.error || "Failed to update profile.");
      }
    });
  };

  return (
    <SettingsCard
      title="General"
      description="Update your personal information:"
    >
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm">
            Your name:
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="max-w-md"
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">
            Your email:
          </label>
          <Input
            id="email"
            value={email}
            disabled
            className="max-w-md opacity-70"
          />
          <div className="text-xs text-my-secondary flex items-start md:items-center gap-1.5 md:px-3">
            <Mail size={12} className="mt-0.5 md:mt-0" />
            <p className="wrap-break-word w-4/5 md:w-auto">
              Email address is managed by your OAuth provider.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            size="sm"
            subject={isPending ? "icon" : "icon-text"}
            variant="outline"
            className="cursor-pointer"
            disabled={
              isPending || name === initialName || name.trim().length === 0
            }
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Save size={16} />
                Save changes
              </>
            )}
          </Button>
        </div>
      </form>
    </SettingsCard>
  );
}
