import type { AnchorHTMLAttributes } from "react";
import { SITE_LINKS, type SiteLinkKey } from "@/config/constants";
import { cn } from "@/lib/utils";

interface ExternalLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href: SiteLinkKey | (string & {});
}

export function ExternalLink({
  href,
  className,
  children,
  ...props
}: ExternalLinkProps) {
  const isSiteLink = href in SITE_LINKS;
  const url = isSiteLink ? SITE_LINKS[href as SiteLinkKey] : href;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </a>
  );
}
