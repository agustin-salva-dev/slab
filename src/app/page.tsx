import Image from "next/image";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="relative min-h-screen h-screen w-screem px-32">
      <Image
        src="/slab-hero-bg.webp"
        alt="Abstract black and white background"
        fill
        priority
        className="blur-sm opacity-55"
      />

      <div className="relative flex flex-col justify-center h-full text-white gap-28">
        <section className="flex flex-col gap-14">
          <h1 className="text-8xl font-bold text-center tracking-tighter">
            The foundation for <br />
            your{" "}
            <span className="font-power tracking-tight italic">
              digital reach.
            </span>
          </h1>
          <p className="text-sm font-extralight text-center">
            Slab turns long, forgotten links into powerful assets. Create clean
            URLs that are safe to click <br /> easy to remember, and impossible
            to ignore. We provide the tools to build your presence <br /> with
            confidence.
          </p>
        </section>
        <section className="flex items-center justify-center gap-12">
          <Button
            variant="secondary"
            size="sm"
            subject="icon-text"
            className="cursor-pointer"
          >
            <Image src="/logo.webp" alt="Slab Logo" width={16} height={16} />
            Create your first Slab
          </Button>
          <Button
            variant="outline"
            size="sm"
            subject="icon-text"
            className="cursor-pointer"
          >
            <Github size={20} />
            Give me a Star
          </Button>
        </section>
      </div>
    </main>
  );
}
