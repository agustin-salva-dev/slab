import { AlertCircle, Link2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-my-background px-4">
      <div className="absolute top-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-my-secondary transition-opacity hover:opacity-80"
        >
          <Link2 className="h-7 w-7" />
          <span className="text-xl font-bold tracking-tight">Slab</span>
        </Link>
      </div>

      <div className="flex max-w-md flex-col items-center text-center space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-my-secondary/5 border border-my-secondary/20">
          <AlertCircle className="h-10 w-10 text-my-accents-yellow" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-my-secondary md:text-3xl">
            Link no disponible
          </h1>
          <p className="text-sm text-my-secondary/60 pb-4">
            El link al que intentas acceder ha expirado, fue deshabilitado o ya no existe.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-my-secondary px-6 py-2.5 text-sm font-medium text-my-background transition-all hover:bg-my-secondary/90 focus:outline-none focus:ring-2 focus:ring-my-secondary focus:ring-offset-2 focus:ring-offset-my-background"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
