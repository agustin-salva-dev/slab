export function DocsHero() {
  return (
    <div className="flex flex-col gap-8 text-center items-center">
      <h1 className="text-4xl md:text-5xl font-power-ultra text-white tracking-tight">
        System Design
      </h1>
      <p className="text-my-secondary text-md max-w-2xl text-shadow-2xs p-3 rounded-2 bg-my-primary/10 border border-my-border-secondary/50 backdrop-blur-sm">
        Slab represents a leap to a unified Next.js stack, engineered for raw
        speed, Developer Experience (DX), and strict end-to-end type safety.
      </p>
    </div>
  );
}
