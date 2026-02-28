import { DocsHero } from "./components/DocsHero";
import { CoreStack } from "./components/CoreStack";
import { EngineFlow } from "./components/EngineFlow";
import { ArchitectureShowcases } from "./components/ArchitectureShowcases";
import { PublicApiCallout } from "./components/PublicApiCallout";

export default function ArchitectureDocs() {
  return (
    <div className="w-full flex justify-center py-24 pb-32 animate-fade-in">
      <div className="max-w-4xl w-full flex flex-col gap-16">
        <DocsHero />
        <CoreStack />
        <EngineFlow />
        <ArchitectureShowcases />
        <PublicApiCallout />
      </div>
    </div>
  );
}
