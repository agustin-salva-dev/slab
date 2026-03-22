export const SITE_LINKS = {
  githubProfile: "https://github.com/agustin-salva-dev",
  githubRepo: "https://github.com/agustin-salva-dev/slab",
  githubIssues: "https://github.com/agustin-salva-dev/slab/issues/new",
  githubProjects: "https://github.com/agustin-salva-dev?tab=repositories",
  linkedin: "https://www.linkedin.com/in/agustin-salva-dev/",
  xProfile: "https://x.com/agvsdev",
  latestFeature:
    "https://github.com/agustin-salva-dev/slab/commit/db1e445e5d87c671f439bc7e7a0c41fa6c49d133",
  contributing:
    "https://github.com/agustin-salva-dev/slab/tree/master?tab=readme-ov-file#-getting-started",
  reportBug: "/report-bug",
} as const;

export type SiteLinkKey = keyof typeof SITE_LINKS;
