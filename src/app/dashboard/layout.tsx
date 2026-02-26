export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/65 -z-10" />
      {children}
    </>
  );
}
