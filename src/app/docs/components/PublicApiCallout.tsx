import { Terminal } from "lucide-react";

export function PublicApiCallout() {
  return (
    <section className="mt-8 w-full animate-fade-in">
      <div className="relative overflow-hidden flex flex-col items-center text-center gap-4 bg-linear-to-b from-my-border-primary/10 to-transparent border border-my-border-secondary/50 rounded-2 p-8 backdrop-blur-sm shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-linear-to-r from-transparent via-my-secondary/40 to-transparent" />
        <Terminal className="w-8 h-8 text-my-secondary mb-2" />
        <h3 className="text-xl font-power-ultra text-white tracking-wide">
          Interested in integrating with Slab?
        </h3>
        <p className="text-my-secondary font-sans text-sm md:text-base max-w-md text-shadow-xs">
          A comprehensive{"  "}
          <span className="text-white font-power-med">Public API</span>
          {"  "}
          to manage your links programmatically is currently on the roadmap.
        </p>
      </div>
    </section>
  );
}
