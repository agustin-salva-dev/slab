import { X } from "lucide-react";

interface FilterChipProps {
  icon: React.ReactNode;
  label: string;
  onRemove: () => void;
}

export function FilterChip({ icon, label, onRemove }: FilterChipProps) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-my-border-primary text-2.5 md:gap-1.5 md:px-2.5 md:text-xs">
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        className="ml-1 cursor-pointer text-white hover:text-my-accents-red"
        onClick={onRemove}
      >
        <X size={12} />
      </button>
    </div>
  );
}
