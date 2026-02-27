"use client";

import Image from "next/image";
import { House, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StarHalf, Ellipsis } from "lucide-react";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { NavbarDropdown } from "@/components/layout/NavbarDropdown";

export default function Navbar() {
  return (
    <nav className="w-full flex flex-row fixed z-10 h-18 px-6 md:px-32 text-sm items-center justify-between backdrop-blur-lg border-b border-my-border-secondary bg-white/1">
      <Link
        href="/"
        className="flex flex-row items-center font-extralight gap-5 text-xs text-white cursor-pointer group size-6 md:size-7"
      >
        <Image src="/logo.webp" alt="Slab Logo" width={28} height={28} />
        <Image
          src="/text-logo.webp"
          alt="Slab Text Logo"
          width={30}
          height={28}
        />
      </Link>
      <ExternalLink
        href="latestFeature"
        className="hidden md:flex flex-row items-center absolute left-1/2 -translate-x-1/2"
      >
        <StarHalf className="text-(--color-my-accents-green)" size={24} />
        <p className="font-power-med text-white">
          New:{" "}
          <span className="font-power-reg text-my-secondary text-shadow-xs">
            Settings page & Account Management (Feb 27)
          </span>
        </p>
      </ExternalLink>
      <section className="hidden md:flex flex-row items-center gap-12">
        <Link href="/">
          <House className="cursor-pointer t-transform hover-grow" size={20} />
        </Link>
        <ExternalLink href="githubRepo">
          <Github className="cursor-pointer t-transform hover-grow" size={20} />
        </ExternalLink>
        <NavbarDropdown />
      </section>

      <div className="md:hidden">
        <NavbarDropdown
          trigger={
            <Button
              variant="outline"
              subject="icon"
              size="xs"
              className="cursor-pointer backdrop-blur-lg bg-white/1"
            >
              <Ellipsis />
            </Button>
          }
        />
      </div>
    </nav>
  );
}
