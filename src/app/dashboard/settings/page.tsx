import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { AccountSettings } from "@/components/settings/AccountSettings";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userSessions = await auth.api.listSessions({
    headers: await headers(),
  });

  const user = session?.user;
  const currentSessionToken = session?.session?.token;

  if (!user || Array.isArray(userSessions) === false) return null;

  return (
    <div className="flex flex-col items-center gap-8 pb-10">
      <GeneralSettings initialName={user.name || ""} email={user.email || ""} />

      <SecuritySettings
        sessions={userSessions}
        currentSessionToken={currentSessionToken || ""}
      />

      <AccountSettings userEmail={user.email || ""} />
    </div>
  );
}
