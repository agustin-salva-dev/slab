import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { CreateLinkButton } from "@/components/links/CreateLinkButton";
import { getUserLinks } from "@/server/queries/links";
import { LinkCard } from "@/components/links/LinkCard";

export default async function Dashboard() {
  const links = await getUserLinks();
  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen bg-black/70 -z-10"></div>
      <div className="h-full py-10 flex flex-col gap-3.5">
        <section className="group w-full flex gap-5 justify-center items-center font-power-ultra text-sm antialiased">
          <p className="cursor-pointer">My Slabs</p>
          <p className="text-my-secondary cursor-pointer t-color hover-white">
            Analytics
          </p>
          <p className="text-my-secondary cursor-pointer t-color hover-white">
            Settings
          </p>
        </section>
        <div className="flex flex-col md:flex-row gap-3.5 w-full justify-between">
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
              <TabsList className="">
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
        {links.length > 0 ? (
          links.map((link) => (
            <LinkCard
              key={link.id}
              shortSlug={link.shortSlug}
              originalUrl={link.originalUrl}
              description={link.description}
            />
          ))
        ) : (
          <p className="text-my-secondary">No hay links para mostrar.</p>
        )}
      </div>
    </>
  );
}
