import { DashboardNav } from "@/components/layout/DashboardNav";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/65 -z-10" />
      <div className="py-10 flex flex-col gap-8">
        <DashboardNav />
        {children}
      </div>
    </>
  );
}
