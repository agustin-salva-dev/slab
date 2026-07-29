export const SITE_LINKS = {
  githubProfile: "https://github.com/agustin-salva-dev",
  githubRepo: "https://github.com/agustin-salva-dev/slab",
  githubIssues: "https://github.com/agustin-salva-dev/slab/issues/new",
  githubProjects: "https://github.com/agustin-salva-dev?tab=repositories",
  linkedin: "https://www.linkedin.com/in/emiliano-agustin-salva/",
  xProfile: "https://x.com/agvsdev",
  latestFeature:
    "https://github.com/agustin-salva-dev/slab/commit/2a949a2ea151d42c6a65646350492f8ff899c052",
  contributing:
    "https://github.com/agustin-salva-dev/slab/tree/master?tab=readme-ov-file#-getting-started",
  reportBug: "/report-bug",
} as const;

export type SiteLinkKey = keyof typeof SITE_LINKS;
