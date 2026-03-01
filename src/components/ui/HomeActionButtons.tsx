"use client";

import Image from "next/image";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { ExternalLink } from "./ExternalLink";
import { SITE_LINKS } from "@/config/constants";
import { authClient } from "@/lib/auth/client";
import Link from "next/link";

export function HomeActionButtons() {
  const { data: session } = authClient.useSession();

  const handleCreateClick = () => {
    if (!session) {
      toast("This feature is currently disabled.");
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-14">
      {/* Create Button - Mobile */}
      {session ? (
        <Link href="/dashboard" className="flex md:hidden">
          <Button
            variant="secondary"
            subject="icon-text"
            size="xs"
            className="w-full cursor-pointer shadow"
          >
            <Image src="/logo.webp" alt="Slab Logo" width={14} height={14} />
            My Slabs
          </Button>
        </Link>
      ) : (
        <Button
          variant="secondary"
          subject="icon-text"
          size="xs"
          className="flex md:hidden cursor-pointer shadow"
          onClick={handleCreateClick}
        >
          <Image src="/logo.webp" alt="Slab Logo" width={14} height={14} />
          Create your first Slab
        </Button>
      )}

      {/* Create Button - Desktop */}
      {session ? (
        <Link href="/dashboard" className="hidden md:flex">
          <Button
            variant="secondary"
            subject="icon-text"
            size="sm"
            className="cursor-pointer"
          >
            <Image src="/logo.webp" alt="Slab Logo" width={16} height={16} />
            My Slabs
          </Button>
        </Link>
      ) : (
        <Button
          variant="secondary"
          subject="icon-text"
          size="sm"
          className="hidden md:flex cursor-pointer"
          onClick={handleCreateClick}
        >
          <Image src="/logo.webp" alt="Slab Logo" width={16} height={16} />
          Create your first Slab
        </Button>
      )}

      {/* Github Button - Mobile */}
      <ExternalLink href={SITE_LINKS.githubRepo}>
        <Button
          variant="outline"
          subject="icon-text"
          size="xs"
          className="flex md:hidden cursor-pointer shadow"
        >
          <Github size={20} />
          Give me a Star
        </Button>
      </ExternalLink>

      {/* Github Button - Desktop */}
      <ExternalLink href={SITE_LINKS.githubRepo}>
        <Button
          variant="outline"
          subject="icon-text"
          size="sm"
          className="hidden md:flex cursor-pointer"
        >
          <Github size={20} />
          Give me a Star
        </Button>
      </ExternalLink>
    </section>
  );
}
