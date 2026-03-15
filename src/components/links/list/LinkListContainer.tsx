import { getUserLinks } from "@/server/queries/links";
import { LinkList } from "./LinkList";

export async function LinkListContainer() {
  const initialLinks = await getUserLinks();

  return <LinkList initialLinks={initialLinks} />;
}
