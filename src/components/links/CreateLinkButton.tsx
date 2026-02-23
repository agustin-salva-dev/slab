"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import CreateLinkModal from "./CreateLinkModal";
import { Plus } from "lucide-react";

export function CreateLinkButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        subject="icon-text"
        size="xs"
        className="flex md:hidden cursor-pointer shadow"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={15} className="fill-my-secondary" />
        Create a link
      </Button>
      <Button
        variant="outline"
        subject="icon-text"
        size="sm"
        className="hidden md:flex cursor-pointer shadow"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={15} className="fill-my-secondary" />
        Create a link
      </Button>

      <CreateLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
