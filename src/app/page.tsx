import Image from "next/image";

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

      <section className="relative z-10 flex flex-col justify-center h-full text-white gap-14">
        <h1 className="text-8xl font-bold text-center">The foundation for <br />
          your <span className="font-power">digital reach.</span></h1>
        <p className="text-sm font-extralight text-center">Slab turns long, forgotten links into powerful assets. Create clean URLs that are safe to click <br /> easy to remember, and impossible to ignore. We provide the tools to build your presence <br /> with confidence.</p>
      </section>

    </main>
  );
}
