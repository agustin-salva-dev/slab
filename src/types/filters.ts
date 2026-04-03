export type CreatedFilter = "today" | "last7days" | "lastMonth" | "older";
export type ExpiresFilter =
  | "today"
  | "tomorrow"
  | "next7days"
  | "thisMonth"
  | "later"
  | "no-expiration";

export type FilterValue = CreatedFilter | ExpiresFilter | string;

export interface ActiveFilters {
  created: CreatedFilter[];
  expires: ExpiresFilter[];
  tags: string[];
}
