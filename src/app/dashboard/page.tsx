import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { CreateLinkButton } from "@/components/links/CreateLinkButton";
import { Suspense } from "react";
import { LinkListContainer } from "@/components/links/LinkListContainer";
import { LinkCardSkeleton } from "@/components/links/LinkCardSkeleton";

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
    <div className="py-10 flex flex-col gap-8">
      <section className="group w-full flex gap-5 justify-center items-center font-power-ultra text-sm antialiased">
        <p className="cursor-pointer">My Slabs</p>
        <p className="text-my-secondary cursor-pointer t-color hover-white">
          Analytics
        </p>
        <p className="text-my-secondary cursor-pointer t-color hover-white">
          Settings
        </p>
      </section>
      <div className="flex flex-col md:flex-row gap-8 md:justify-between w-full ">
        <SearchBar
          type="email"
          placeholder="Search links"
          inputSize="sm"
          className="hidden md:flex w-xs"
        />
        <SearchBar
          type="email"
          placeholder="Search links"
          inputSize="xs"
          className="flex md:hidden w-full"
        />
        <section className="flex justify-between md:gap-6">
          <CreateLinkButton />

          <Tabs
            defaultValue="newer"
            className="h-fit w-fit rounded-2 flex items-center bg-my-border-primary"
          >
            <TabsList>
              <TabsTrigger value="newer">Newer</TabsTrigger>
              <TabsTrigger value="older">Older</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            subject="text-icon"
            size="xs"
            className="flex md:hidden cursor-pointer shadow"
          >
            Filters
            <ChevronDown size={15} className="fill-my-secondary" />
          </Button>
          <Button
            variant="outline"
            subject="text-icon"
            size="sm"
            className="hidden md:flex cursor-pointer shadow"
          >
            Filters
            <ChevronDown size={15} className="fill-my-secondary" />
          </Button>
        </section>
      </div>
      <Suspense fallback={<SkeletonsFallback />}>
        <LinkListContainer />
      </Suspense>
    </div>
  );
}
