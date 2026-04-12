import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
/**
 * TODO: Toggle sort order (Newest to Oldest / Oldest to Newest) - FURTHER DOWN THE ROAD.
 * import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
 */
import { CreateLinkButton } from "@/components/links/list/CreateLinkButton";
import { LinkSearchBar } from "@/components/links/list/LinkSearchBar";
import { Suspense } from "react";
import { AddFilterDropdown } from "@/components/filters/dropdown/AddFilterDropdown";
import { LinkListContainer } from "@/components/links/list/LinkListContainer";
import { LinkCardSkeleton } from "@/components/links/card/LinkCardSkeleton";

export const metadata: Metadata = {
  title: "My Slabs",
  description:
    "Manage, track, and organize all your shortened links in one place.",
};

function SkeletonsFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-25 gap-y-10">
      <LinkCardSkeleton />
      <LinkCardSkeleton />
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 md:justify-between w-full ">
        <LinkSearchBar />
        <section className="flex justify-between md:gap-6">
          <CreateLinkButton />

          {/* <Tabs
            defaultValue="newer"
            className="h-fit w-fit rounded-2 flex items-center bg-my-border-primary"
          >
            <TabsList>
              <TabsTrigger value="newer">Newer</TabsTrigger>
              <TabsTrigger value="older">Older</TabsTrigger>
            </TabsList>
          </Tabs> */}

          <AddFilterDropdown>
            <Button
              variant="outline"
              subject="text-icon"
              size="xs"
              className="flex md:hidden cursor-pointer shadow"
            >
              Filters
              <ChevronDown size={15} className="fill-my-secondary" />
            </Button>
          </AddFilterDropdown>
          <AddFilterDropdown>
            <Button
              variant="outline"
              subject="text-icon"
              size="sm"
              className="hidden md:flex cursor-pointer shadow"
            >
              Filters
              <ChevronDown size={15} className="fill-my-secondary" />
            </Button>
          </AddFilterDropdown>
        </section>
      </div>
      <Suspense fallback={<SkeletonsFallback />}>
        <LinkListContainer />
      </Suspense>
    </>
  );
}
