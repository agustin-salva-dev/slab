import React from "react";
import { ChevronsRight } from "lucide-react";
import { ARCHITECTURE_SHOWCASES } from "../constants";

export function ArchitectureShowcases() {
  return (
    <>
      {ARCHITECTURE_SHOWCASES.map((section, sIdx) => (
        <section
          key={sIdx}
          className={`flex flex-col gap-6 pt-8 border-t border-my-border-secondary/30`}
        >
          <div className="flex items-center gap-3">
            <section.sectionIcon className="text-white w-6 h-6" />
            <h2 className="text-2xl font-power-ultra text-white">
              {section.sectionTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-10 items-center">
            {section.rows.map((row, rIdx) => (
              <React.Fragment key={rIdx}>
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-stretch w-full">
                  <div className="flex flex-col gap-3 bg-my-accents-red/5 border border-my-accents-red/20 hover:border-my-accents-red/50 t-color rounded-2 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-my-accents-red">
                      <span className="text-lg">{row.problemIcon}</span>
                      <h3 className="font-power-med text-sm uppercase tracking-wider">
                        {row.problemTitle}
                      </h3>
                    </div>
                    <p className="text-sm text-my-secondary font-sans leading-relaxed text-shadow-lg">
                      {row.problemDesc}
                    </p>
                  </div>

                  <div className="flex justify-center items-center py-2 md:py-0">
                    <ChevronsRight className="text-my-border-secondary hidden md:block w-8 h-8" />
                  </div>

                  <div className="flex flex-col gap-3 bg-my-accents-green/5 border border-my-accents-green/20 hover:border-my-accents-green/50 t-color rounded-2 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-my-accents-green">
                      <span className="text-lg">{row.solutionIcon}</span>
                      <h3 className="font-power-med text-sm uppercase tracking-wider">
                        {row.solutionTitle}
                      </h3>
                    </div>
                    <p className="text-sm text-my-secondary font-sans leading-relaxed text-shadow-lg">
                      {row.solutionDesc}
                    </p>
                  </div>
                </div>

                {rIdx < section.rows.length - 1 && (
                  <hr className="w-4/5 border-my-border-secondary/40" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
