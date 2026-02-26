import { Sparkles } from "lucide-react";
import { CreateLinkButton } from "./CreateLinkButton";

export function EmptyLinkList() {
  return (
    <div className="flex flex-col items-center justify-center p-10 gap-y-4 col-span-1 md:col-span-2">
      <Sparkles
        size={50}
        strokeWidth={1}
        className="text-white"
        fill="transparent"
      />
      <div className="flex flex-col items-center gap-y-1 text-center">
        <h3 className="font-power-ultra text-white text-xl">
          No links created yet
        </h3>
        <p className="text-sm text-my-secondary">
          Create your first Slab to start
        </p>
      </div>
      <div className="mt-2">
        <CreateLinkButton />
      </div>
    </div>
  );
}
