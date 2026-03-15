export type CreatedFilter = "today" | "last7days" | "lastMonth" | "older";

export interface ActiveFilters {
  created: CreatedFilter[];
}
