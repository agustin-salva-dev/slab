import { HomeActionButtons } from "@/components/ui/HomeActionButtons";
export default function Home() {
  return (
    <div className="flex flex-col justify-center flex-1 text-white gap-12 md:gap-28">
      <section className="flex flex-col items-center gap-5 md:gap-14">
        <h1 className="text-4xl md:text-8xl font-bold text-center tracking-tighter">
          The foundation for <br />
          your{" "}
          <span className="font-power-ultra tracking-tight italic">
            digital reach.
          </span>
        </h1>
        <p className="text-2.5 leading-loose md:leading-normal md:text-sm font-extralight text-center">
          Slab turns long, forgotten links into powerful assets. Create clean
          URLs that are safe to click <br className="hidden md:block" /> easy to
          remember, and impossible to ignore. We provide the tools to build your
          presence <br className="hidden md:block" /> with confidence.
        </p>
      </section>
      <HomeActionButtons />
    </div>
  );
}
