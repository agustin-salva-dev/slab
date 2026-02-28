export const SITE_LINKS = {
  githubProfile: "https://github.com/agustin-salva-dev",
  githubRepo: "https://github.com/agustin-salva-dev/slab",
  githubIssues: "https://github.com/agustin-salva-dev/slab/issues/new",
  githubProjects: "https://github.com/agustin-salva-dev?tab=repositories",
  linkedin: "https://www.linkedin.com/in/agustin-salva-dev/",
  xProfile: "https://x.com/agvsdev",
  latestFeature:
    "https://github.com/agustin-salva-dev/slab/commit/eebe61075e5be3c9f162e36a0c1a2dcfa2bdad5a",
  contributing:
    "https://github.com/agustin-salva-dev/slab/tree/master?tab=readme-ov-file#-getting-started",
} as const;

export type SiteLinkKey = keyof typeof SITE_LINKS;
