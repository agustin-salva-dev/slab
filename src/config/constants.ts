export const SITE_LINKS = {
  githubProfile: "https://github.com/agustin-salva-dev",
  githubRepo: "https://github.com/agustin-salva-dev/slab",
  githubIssues: "https://github.com/agustin-salva-dev/slab/issues/new",
  githubProjects: "https://github.com/agustin-salva-dev?tab=repositories",
  linkedin: "https://www.linkedin.com/in/agustin-salva-dev/",
  xProfile: "https://x.com/agvsdev",
  latestFeature:
    "https://github.com/agustin-salva-dev/slab/commit/56221d59f9222f600305cddbb10151e43cf5d9a1",
} as const;

export type SiteLinkKey = keyof typeof SITE_LINKS;
