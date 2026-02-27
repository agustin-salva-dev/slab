export const parseOS = (ua?: string | null): string => {
  if (!ua) return "Unknown Device";

  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";

  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "Mac";
  if (ua.includes("Linux")) return "Linux";

  return "Unknown Device";
};

export const isMobileOS = (os: string): boolean => {
  return os === "Android" || os === "iOS";
};
