import { CORE_STACK } from "../constants";

export function CoreStack() {
  return (
    <section className="flex flex-col items-center gap-6">
      <p className="text-sm font-power-ultra text-white uppercase tracking-widest opacity-70 decoration-my-border-secondary underline underline-offset-8">
        Core Stack
      </p>
      <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-14 bg-my-primary/10 border border-my-border-secondary/50 rounded-2 py-6 px-10 shadow-lg shadow-black/20 backdrop-blur-sm">
        {CORE_STACK.map((tech, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 group cursor-pointer hover-grow t-transform"
          >
            <tech.icon className="w-10 h-10 text-white" />
            <span className="text-xs font-power-med text-my-secondary group-hover:text-white t-color">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
