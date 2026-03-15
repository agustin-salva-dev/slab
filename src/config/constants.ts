export const SITE_LINKS = {
  githubProfile: "https://github.com/agustin-salva-dev",
  githubRepo: "https://github.com/agustin-salva-dev/slab",
  githubIssues: "https://github.com/agustin-salva-dev/slab/issues/new",
  githubProjects: "https://github.com/agustin-salva-dev?tab=repositories",
  linkedin: "https://www.linkedin.com/in/agustin-salva-dev/",
  xProfile: "https://x.com/agvsdev",
  latestFeature:
    "https://github.com/agustin-salva-dev/slab/commit/6e3475d3c220b15f891bab75150bec8f9451b56f",
  contributing:
    "https://github.com/agustin-salva-dev/slab/tree/master?tab=readme-ov-file#-getting-started",
  reportBug: "/report-bug",
} as const;

export type SiteLinkKey = keyof typeof SITE_LINKS;
