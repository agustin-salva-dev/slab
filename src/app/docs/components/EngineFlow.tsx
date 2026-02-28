import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { ENGINE_FLOW } from "../constants";

export function EngineFlow() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-power-ultra text-white border-b border-my-border-secondary pb-4">
        The Redirect Engine Flow
      </h2>
      <p className="text-my-secondary font-sans text-shadow-xs p-3 rounded-2 bg-my-primary/40 border border-my-border-secondary/30 backdrop-blur-md">
        Slab&apos;s primary goal is minimizing latency. A redirect must happen
        in milliseconds. Instead of blocking the request to save analytics to
        the database, Slab redirects instantly at the Edge and queues database
        writes asynchronously.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4 py-8">
        {ENGINE_FLOW.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center gap-3 w-48 group">
              <div
                className={`size-16 rounded-full border flex items-center justify-center t-color ${step.bgClass}`}
              >
                <step.icon className={`w-7 h-7 ${step.iconColor}`} />
              </div>
              <div>
                <h3 className="font-power-med text-white text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-my-secondary font-sans mt-1">
                  {step.subtitle}
                </p>
              </div>
            </div>
            {idx < ENGINE_FLOW.length - 1 && (
              <ArrowRightLeft className="text-my-border-secondary hidden md:block w-8 h-8" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
