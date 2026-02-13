import Image from "next/image";
import { House, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChevronRight, StarHalf } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="w-full flex flex-row fixed z-10 px-32 py-5 text-sm items-center justify-between backdrop-blur-lg border-b border-my-border-secondary bg-white/1">
            <div className="flex flex-row items-center font-extralight gap-5 text-xs text-white cursor-pointer group">
                <Image src="/logo.webp" alt="Slab Logo" width={28} height={28} />
                <Image
                    src="/text-logo.webp"
                    alt="Slab Text Logo"
                    width={30}
                    height={28}
                />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-row items-center">
                <StarHalf className="text-(--color-my-accents-green)" size={24} />
                <p className="font-power text-white">
                    New:{" "}
                    <span className="text-my-secondary">Slab-Tree Editor (Jan 24)</span>
                </p>
            </div>
            <section className="flex flex-row items-center gap-12">
                <House className="cursor-pointer t-transform hover-grow" size={20} />
                <Github className="cursor-pointer t-transform hover-grow" size={20} />
                <Button
                    variant="outline"
                    size="xs"
                    subject="text-icon"
                    className="cursor-pointer"
                >
                    Get started <ChevronRight className="size-4.75!" />{" "}
                </Button>
            </section>
        </nav>
    );
}
