import {
  Nextjs,
  Prisma,
  TypeScript,
  Inngest,
  SWR,
  BetterAuth,
} from "@/components/icons/BrandIcons";
import {
  Server,
  Zap,
  Database,
  ShieldCheck,
  Activity,
  Cpu,
} from "lucide-react";

export const CORE_STACK = [
  { icon: Nextjs, name: "Next.js 15" },
  { icon: TypeScript, name: "TypeScript" },
  { icon: Prisma, name: "Prisma ORM" },
  { icon: Inngest, name: "Inngest" },
  { icon: SWR, name: "SWR" },
  { icon: BetterAuth, name: "Better Auth" },
];

export const ENGINE_FLOW = [
  {
    icon: Server,
    title: "Incoming Request",
    subtitle: "User clicks shortened link",
    iconColor: "text-white",
    bgClass: "bg-white/5 border-white/20 group-hover:border-white/40 shadow-lg",
  },
  {
    icon: Zap,
    title: "Edge Redirect",
    subtitle: "0ms perceived latency",
    iconColor: "text-my-accents-green",
    bgClass:
      "bg-my-accents-green/10 border-my-accents-green/20 shadow-my-accents-green/10 group-hover:border-my-accents-green/50 shadow-lg",
  },
  {
    icon: Activity,
    title: "Async Inngest Event",
    subtitle: "Queue analytics",
    iconColor: "text-my-accents-blue",
    bgClass:
      "bg-my-accents-blue/10 border-my-accents-blue/20 shadow-my-accents-blue/10 group-hover:border-my-accents-blue/50 shadow-lg",
  },
  {
    icon: Database,
    title: "DB Write",
    subtitle: "Strict types via Prisma",
    iconColor: "text-white",
    bgClass: "bg-white/5 border-white/20 group-hover:border-white/40 shadow-lg",
  },
];

export const ARCHITECTURE_SHOWCASES = [
  {
    sectionIcon: ShieldCheck,
    sectionTitle: "Data Integrity",
    rows: [
      {
        problemIcon: "⚠️",
        problemTitle: "The Problem",
        problemDesc:
          "If the network fails while logging a click and updating total counts separately, data loses sync.",
        solutionIcon: "✅",
        solutionTitle: "Slab's Solution",
        solutionDesc: (
          <>
            Atomic{" "}
            <code className="text-my-accents-green bg-my-accents-green/10 border border-my-accents-green/20 px-1.5 py-0.5 rounded font-power-reg text-xs">
              $transaction
            </code>{" "}
            via Prisma. The click and the count update succeed together, or fail
            together. Zero desync.
          </>
        ),
      },
    ],
  },
  {
    sectionIcon: Activity,
    sectionTitle: "Optimistic UI",
    rows: [
      {
        problemIcon: "⏳",
        problemTitle: "The Problem",
        problemDesc:
          "Waiting for the server to confirm every action creates lag and frustrates the user with loading spinners.",
        solutionIcon: "⚡",
        solutionTitle: "Slab's Solution",
        solutionDesc: (
          <>
            Powered by{" "}
            <code className="text-my-accents-blue bg-my-accents-blue/10 border border-my-accents-blue/20 px-1.5 py-0.5 rounded font-power-reg text-xs">
              SWR
            </code>
            , the UI mutates instantly. Background sync happens silently. 0ms
            perceived latency.
          </>
        ),
      },
    ],
  },
  {
    sectionIcon: Cpu,
    sectionTitle: "Execution Strategy",
    rows: [
      {
        problemIcon: "🛡️",
        problemTitle: (
          <>
            The Problem <span className="font-power-ultra">(Security)</span>
          </>
        ),
        problemDesc:
          "Client-side API calls expose logic, invite CORS issues, and can be intercepted.",
        solutionIcon: "✅",
        solutionTitle: (
          <>
            Slab&apos;s Solution{" "}
            <span className="font-power-ultra">(Server Actions)</span>
          </>
        ),
        solutionDesc: (
          <>
            All data mutations happen securely on the{" "}
            <code className="text-white bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-power-reg text-xs">
              Node.js
            </code>{" "}
            server. Zero client exposure.
          </>
        ),
      },
      {
        problemIcon: "🐢",
        problemTitle: (
          <>
            The Problem <span className="font-power-ultra">(Latency)</span>
          </>
        ),
        problemDesc:
          "Booting a full Node.js server just to calculate and redirect a URL is overkill and slow.",
        solutionIcon: "⚡",
        solutionTitle: (
          <>
            Slab&apos;s Solution{" "}
            <span className="font-power-ultra">(Edge)</span>
          </>
        ),
        solutionDesc: (
          <>
            Redirects execute at the perimetral{" "}
            <code className="text-my-accents-green bg-my-accents-green/10 border border-my-accents-green/20 px-1.5 py-0.5 rounded font-power-reg text-xs">
              Edge Network (V8)
            </code>
            , physically closer to the user for instant routing.
          </>
        ),
      },
    ],
  },
];
