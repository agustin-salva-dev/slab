import { Card, CardBody } from "@/components/ui/Card";
import { ExternalLink } from "lucide-react"; // Opcional para el icono

interface LinkCardProps {
  shortSlug: string;
  originalUrl: string;
  description?: string | null;
}

export function LinkCard({ shortSlug, originalUrl, description }: LinkCardProps) {
  return (
    <Card className="hover:border-my-secondary t-color group">
      <CardBody className="flex flex-col gap-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-power-med truncate">
            slab.to/{shortSlug}
          </h3>
          <a 
            href={originalUrl} 
            target="_blank" 
            className="text-my-secondary hover:text-white t-color"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        
        <p className="text-sm text-my-secondary line-clamp-2">
          {description || "No description provided."}
        </p>
        
        <div className="mt-2 pt-2 border-t border-my-border-primary">
          <span className="text-xs text-my-secondary truncate block">
            Destino: {originalUrl}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}