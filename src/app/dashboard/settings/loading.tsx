import { Skeleton } from "@/components/ui/Skeleton";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { Separator } from "@/components/ui/Separator";

export default function SettingsLoading() {
  return (
    <div className="flex flex-col items-center gap-8 pb-10">
      <SettingsCard
        title="General"
        description="Update your personal information:"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full max-w-md" />
            <div className="flex items-center gap-1.5 mt-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Security"
        description="Manage your active sessions and devices:"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-32" />
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-end justify-between border border-my-border-secondary/30 rounded-2 p-3 bg-white/5">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-1" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Account"
        description="Update your account settings:"
        bodyClassName="gap-8"
      >
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-36" />
        </div>

        <Separator className="bg-my-border-secondary/30" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-9 w-36" />
        </div>
      </SettingsCard>
    </div>
  );
}
