import { BugReportForm } from "./components/BugReportForm";
import { Bug, TerminalSquare, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Report a Bug - Slab",
  description:
    "Help us improve Slab by reporting bugs. We auto-generate a GitHub issue.",
};

export default function ReportBugPage() {
  return (
    <div className="w-full flex justify-center py-24 pb-32 px-4 md:px-0 animate-fade-in relative overflow-x-hidden md:overflow-x-visible">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-45 md:w-96 h-40 md:h-96 bg-my-accents-red/20 md:bg-my-accents-red/10 rounded-full blur-2xl md:blur-3xl -z-10 animate-pulse-slow pointer-events-none" />

      <div className="max-w-4xl w-full flex flex-col gap-12 items-center">
        <section className="flex flex-col gap-6 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-my-accents-red/10 border border-my-accents-red/20 mb-2">
            <Bug className="size-4 text-my-accents-red" />
            <span className="text-xs font-power-med text-my-accents-red tracking-wide uppercase">
              Support & Tracking
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-power-ultra text-white tracking-tight">
            Found a glitch
            <span className="text-my-accents-red font-power-ultra">?</span>
          </h1>

          <p className="text-my-secondary text-base md:text-lg">
            Slab is built for speed, but sometimes things break. Provide clear
            steps below and we&apos;ll build a ready-to-submit GitHub issue for
            you.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="bg-my-primary/30 border border-my-border-primary/70 p-5 rounded-2 flex items-start gap-4">
            <TerminalSquare className="size-6 text-my-accents-green shrink-0 mt-1" />
            <div>
              <h3 className="font-power-med text-white text-sm mb-1">
                Clear Steps
              </h3>
              <p className="text-xs text-my-secondary">
                Exact steps to trigger the bug save hours of guessing.
              </p>
            </div>
          </div>

          <div className="bg-my-primary/30 border border-my-border-primary/70 p-5 rounded-2 flex items-start gap-4">
            <AlertTriangle className="size-6 text-my-accents-yellow shrink-0 mt-1" />
            <div>
              <h3 className="font-power-med text-white text-sm mb-1">
                Expected vs Actual
              </h3>
              <p className="text-xs text-my-secondary">
                Helps us determine if it&apos;s a bug or a missing feature.
              </p>
            </div>
          </div>
        </section>

        <BugReportForm />
      </div>
    </div>
  );
}
