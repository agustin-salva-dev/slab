"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  House,
  LayoutDashboard,
  Bug,
  BookOpenText,
  Cable,
  Send,
  LogIn,
  Fingerprint,
  Logs,
  ChevronRight,
  Settings,
  FolderKanban,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth/client";
import { SITE_LINKS } from "@/config/constants";
import { LogoutModal } from "@/components/auth/LogoutModal";
import { useState } from "react";

export function NavbarDropdown({ trigger }: { trigger?: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const user = session?.user;
  const iconsSize = 22;
  const textSize = "text-sm";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {trigger ? (
            trigger
          ) : user ? (
            <button
              type="button"
              aria-label="User Menu"
              disabled={isPending}
              className="outline-none focus:outline-none ring-0 focus:ring-0"
            >
              <Logs
                size={24}
                className=" hover:text-my-hover t-color cursor-pointer"
              />
            </button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              subject="text-icon"
              className="cursor-pointer"
              disabled={isPending}
            >
              Get started <ChevronRight className="size-4.75!" />
            </Button>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={36}
          className="w-[240px] shadow-2xl shadow-black/80 backdrop-blur-xl bg-white/2.5"
        >
          {user ? (
            <DropdownMenuLabel className="flex items-center gap-3 py-2">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <span className="text-sm font-power-ultra">
                      {user.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="font-power-ultra tracking-wide text-4 truncate">
                  {user.name}
                </span>
                <span className="font-power-reg tracking-wider text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
          ) : (
            <DropdownMenuLabel className="flex flex-col gap-1">
              <span className="font-power-ultra tracking-wide text-4">
                Sign in
              </span>
              <span className="font-power-reg tracking-wider text-xs text-muted-foreground">
                Sign in to unlock all features
              </span>
            </DropdownMenuLabel>
          )}
          <DropdownMenuSeparator />

          {/* Global actions */}
          <DropdownMenuItem asChild>
            <Link
              href="/"
              className="cursor-pointer flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center">
                <House
                  strokeWidth={1}
                  size={iconsSize}
                  className="text-my-secondary group-hover:text-my-hover transition-colors"
                />
              </span>
              <span
                className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
              >
                Home
              </span>
            </Link>
          </DropdownMenuItem>

          {user ? (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="cursor-pointer flex items-center gap-3 group"
                >
                  <span className="flex items-center justify-center">
                    <LayoutDashboard
                      strokeWidth={1}
                      size={iconsSize}
                      className="text-my-secondary group-hover:text-my-hover transition-colors"
                    />
                  </span>
                  <span
                    className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
                  >
                    Dashboard
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer flex items-center gap-3 group"
                >
                  <span className="flex items-center justify-center">
                    <Settings
                      strokeWidth={1}
                      size={iconsSize}
                      className="text-my-secondary group-hover:text-my-hover transition-colors"
                    />
                  </span>
                  <span
                    className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
                  >
                    Settings
                  </span>
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild>
              <Link
                href="/login"
                className="cursor-pointer flex items-center gap-3 group"
              >
                <span className="flex items-center justify-center">
                  <Fingerprint
                    strokeWidth={1}
                    size={iconsSize}
                    className="text-my-secondary group-hover:text-my-hover transition-colors"
                  />
                </span>
                <span
                  className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
                >
                  Log In
                </span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />

          {/* Resources & Support */}
          <DropdownMenuItem asChild>
            <a
              href={SITE_LINKS.githubIssues}
              className="cursor-pointer flex items-center gap-3 group"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex items-center justify-center">
                <Bug
                  strokeWidth={1}
                  size={iconsSize}
                  className="text-my-secondary group-hover:text-my-hover transition-colors"
                />
              </span>
              <span
                className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
              >
                Report a bug
              </span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href="#"
              className="cursor-pointer flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center">
                <BookOpenText
                  strokeWidth={1}
                  size={iconsSize}
                  className="text-my-secondary group-hover:text-my-hover transition-colors"
                />
              </span>
              <span
                className={`text-my-secondary group-hover:text-my-hover transition-colors ${textSize}`}
              >
                Documentation
              </span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href="#"
              className="cursor-pointer flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center">
                <Cable
                  strokeWidth={1}
                  size={iconsSize}
                  className="text-my-secondary group-hover:text-my-hover transition-colors"
                />
              </span>
              <span
                className={`text-my-secondary group-hover:text-my-hover transition-colors ${textSize}`}
              >
                API
              </span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Social / Projects */}
          <DropdownMenuItem asChild>
            <a
              href={SITE_LINKS.xProfile}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center">
                <Send
                  strokeWidth={1}
                  size={iconsSize}
                  className="text-my-secondary group-hover:text-my-hover transition-colors"
                />
              </span>
              <span
                className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
              >
                Contact me
              </span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={SITE_LINKS.githubProjects}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center">
                <FolderKanban
                  strokeWidth={1}
                  size={iconsSize}
                  className="text-my-secondary group-hover:text-my-hover transition-colors"
                />
              </span>
              <span
                className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
              >
                My projects
              </span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={SITE_LINKS.githubRepo}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center">
                <FolderGit2
                  strokeWidth={1}
                  size={iconsSize}
                  className="text-my-secondary group-hover:text-my-hover transition-colors"
                />
              </span>
              <span
                className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
              >
                Slab Repository
              </span>
            </a>
          </DropdownMenuItem>

          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogoutModalOpen(true);
                }}
                className="cursor-pointer flex items-center gap-3 group"
              >
                <span className="flex items-center justify-center">
                  <LogIn
                    strokeWidth={1}
                    size={iconsSize}
                    className="text-my-secondary group-hover:text-my-hover transition-colors"
                  />
                </span>
                <span
                  className={`text-white group-hover:text-my-hover transition-colors ${textSize}`}
                >
                  Log out
                </span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}
