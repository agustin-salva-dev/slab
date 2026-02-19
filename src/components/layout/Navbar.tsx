import Image from "next/image";
import { House, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChevronRight, StarHalf, Ellipsis } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full flex flex-row fixed z-10 h-18 px-6 md:px-32 text-sm items-center justify-between backdrop-blur-lg border-b border-my-border-secondary bg-white/1">
            <div className="flex flex-row items-center font-extralight gap-5 text-xs text-white cursor-pointer group size-6 md:size-7">
                <Image src="/logo.webp" alt="Slab Logo" width={28} height={28} />
                <Image
                    src="/text-logo.webp"
                    alt="Slab Text Logo"
                    width={30}
                    height={28}
                />
            </div>
            <div className="hidden md:flex flex-row items-center absolute left-1/2 -translate-x-1/2">
                <StarHalf className="text-(--color-my-accents-green)" size={24} />
                <p className="font-power-med text-white">
                    New:{" "}
                    <span className="font-power-reg text-my-secondary">Slab-Tree Editor (Jan 24)</span>
                </p>
            </div>
            <section className="hidden md:flex flex-row items-center gap-12">
                <House className="cursor-pointer t-transform hover-grow" size={20} />
                <Github className="cursor-pointer t-transform hover-grow" size={20} />
                <Button
                    variant="outline"
                    size="sm"
                    subject="text-icon"
                    className="cursor-pointer"
                >
                    Get started <ChevronRight className="size-4.75!" />
                </Button>
            </section>
            <Button
                variant="outline"
                subject="icon"
                size="xs"
                className="md:hidden cursor-pointer backdrop-blur-lg bg-white/1">
                <Ellipsis />
            </Button>
        </nav>
    );
}
