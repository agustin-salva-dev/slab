import Image from "next/image";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="relative min-h-screen h-screen w-screen px-6 md:px-32">
      <Image
        src="/slab-hero-bg.webp"
        alt="Abstract black and white background"
        fill
        priority
        className="hidden md:block blur-sm opacity-55"
      />
      <Image
        src="/slab-mobile-hero-bg.webp"
        alt="Abstract black and white background in mobile dimensions"
        fill
        priority
        className="block md:hidden blur-sm opacity-55"
      />

      <div className="relative flex flex-col justify-center h-full text-white gap-14 md:gap-28 px-10 md:px-20">
        <section className="flex flex-col gap-5 md:gap-14">
          <h1 className="text-4xl md:text-8xl font-bold text-center tracking-tighter">
            The foundation for <br />
            your{" "}
            <span className="font-power tracking-tight italic">
              digital reach.
            </span>
          </h1>
          <p className="text-2.5 leading-loose md:leading-normal md:text-sm font-extralight text-center">
            Slab turns long, forgotten links into powerful assets. Create clean
            URLs that are safe to click <br /> easy to remember, and impossible
            to ignore. We provide the tools to build your presence <br /> with
            confidence.
          </p>
        </section>
        <section className="flex flex-col md:flex-row items-center justify-center gap-12">
          <Button
            variant="secondary"
            subject="icon-text"
            size="xs"
            className="flex md:hidden cursor-pointer shadow"
          >
            <Image src="/logo.webp" alt="Slab Logo" width={14} height={14} />
            Create your first Slab
          </Button>
          {/* Versión Desktop (Oculto en móvil, aparece en md) */}
          <Button
            variant="secondary"
            subject="icon-text"
            size="sm"
            className="hidden md:flex cursor-pointer"
          >
            <Image src="/logo.webp" alt="Slab Logo" width={16} height={16} />
            Create your first Slab
          </Button>

          <Button
            variant="outline"
            subject="icon-text"
            size="xs"
            className="flex md:hidden cursor-pointer shadow"
          >
            <Github size={20} />
            Give me a Star
          </Button>
          {/* Versión Desktop (Oculto en móvil, aparece en md) */}
          <Button
            variant="outline"
            subject="icon-text"
            size="sm"
            className="hidden md:flex cursor-pointer"
          >
            <Github size={20} />
            Give me a Star
          </Button>
        </section>
      </div>
    </main>
  );
}
