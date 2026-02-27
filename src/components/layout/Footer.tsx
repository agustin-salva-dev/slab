"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageCircleHeart,
  Squircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  GitHub,
  LinkedIn,
  XformerlyTwitter,
} from "@/components/icons/BrandIcons";
import { Separator } from "@/components/ui/Separator";
import { ExternalLink } from "@/components/ui/ExternalLink";

const APP_VERSION = "v0.7.0";

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0);

  // The sections to be displayed
  const sections = [
    <section key="made-by" className="flex items-center gap-3.5">
      <MessageCircleHeart className="text-my-accents-red" size={20} />
      <p className="truncate px-2">
        <span className="font-normal">
          Made <span className="inline md:hidden">with love</span> by
        </span>{" "}
        <ExternalLink href="xProfile">Agvstindev</ExternalLink>{" "}
        <span className="text-my-secondary font-normal hidden md:inline">
          - inspired on Slug: by <span className="font-bold">Pheralb</span>
        </span>
      </p>
    </section>,

    <section
      key="socials"
      className="flex items-center gap-6 md:gap-12 text-my-secondary"
    >
      <ExternalLink
        href="githubProfile"
        className="group flex items-center gap-3"
      >
        <p className="t-color hover-white hidden md:block">My profile</p>
        <GitHub className="size-5" />
      </ExternalLink>
      <ExternalLink href="xProfile" className="group flex items-center gap-3">
        <p className="t-color hover-white hidden md:block">Contact me</p>
        <XformerlyTwitter className="size-4 fill-white" />
      </ExternalLink>
      <ExternalLink href="linkedin" className="group flex items-center gap-3">
        <p className="t-color hover-white hidden md:block">
          Let&apos;s connect
        </p>
        <LinkedIn className="size-5" />
      </ExternalLink>
    </section>,

    <section key="status" className="flex items-center gap-6 md:gap-12">
      <div className="flex items-center gap-3.5">
        <Squircle className="fill-my-accents-yellow stroke-0 size-3 shrink-0" />
        <p className="truncate">
          Status{" "}
          <span className="font-normal text-my-secondary">
            : In Development
          </span>
        </p>
      </div>
      <Separator orientation="vertical" className="h-5" />
      <p>{APP_VERSION}</p>
    </section>,
  ];

  const sectionCount = sections.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % sectionCount);
  }, [sectionCount]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + sectionCount) % sectionCount);
  }, [sectionCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, handleNext]);

  return (
    <footer className="fixed bottom-0 w-screen h-11 bg-my-primary flex items-center justify-center md:justify-between px-2 md:px-32 text-xs font-bold">
      {/* Mobile view (Carousel) */}
      <div className="flex md:hidden w-full max-w-full items-center justify-between">
        <button
          onClick={handlePrev}
          type="button"
          className="p-1 cursor-pointer text-my-secondary hover:text-white transition-colors"
          aria-label="Previous section"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex-1 flex justify-center items-center overflow-hidden">
          {sections[activeIndex]}
        </div>

        <button
          onClick={handleNext}
          type="button"
          className="p-1 cursor-pointer text-my-secondary hover:text-white transition-colors"
          aria-label="Next section"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Desktop view (All sections) */}
      <div className="hidden md:flex w-full items-center justify-between">
        {sections.map((section, index) => (
          <div key={index}>{section}</div>
        ))}
      </div>
    </footer>
  );
}
