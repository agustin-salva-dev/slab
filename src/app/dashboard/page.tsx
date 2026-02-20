import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/ui/SearchBar";
import { Plus, ChevronDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
{ /* import CreateLinkModal from "@/components/ui/CreateLink"; */ }


export default function Dashboard() {
    return (
        <>
            <div className="absolute top-0 left-0 h-screen w-screen bg-black/70 -z-10"></div>
            <div className="h-full py-10">
                <section className="group w-full flex gap-5 justify-center items-center font-power-ultra text-sm antialiased">
                    <p className="cursor-pointer">My Slabs</p>
                    <p className="text-my-secondary cursor-pointer t-color hover-white">Analytics</p>
                    <p className="text-my-secondary cursor-pointer t-color hover-white">Settings</p>
                </section>
                <div className="flex w-full justify-between">
                    <SearchBar type="email" placeholder="Search links" inputSize="sm" className="w-xs" />
                    <section className="flex gap-6">
                        <Button
                            variant="outline"
                            subject="icon-text"
                            size="sm"
                            className="flex cursor-pointer shadow"
                        >
                            <Plus size={15} className="fill-my-secondary" />
                            Create a link
                        </Button>

                        <Tabs defaultValue="newer" className="w-fit rounded-2 flex items-center bg-my-border-primary">
                            <TabsList className="h-fit">
                                <TabsTrigger value="newer">Newer</TabsTrigger>
                                <TabsTrigger value="older">Older</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Button
                            variant="outline"
                            subject="text-icon"
                            size="sm"
                            className="flex cursor-pointer shadow"
                        >
                            Filters
                            <ChevronDown size={15} className="fill-my-secondary" />
                        </Button>
                    </section>
                </div>
                { /* <CreateLinkModal /> */}
            </div>
        </>
    )
}