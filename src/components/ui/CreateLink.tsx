import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function CreateLinkModal() {
    return (
        <Card className="w-full max-w-xl absolute left-1/3">
            <CardHeader className="flex items-center gap-2.5">
                <div className="flex items-center gap-2.5">
                    <CardTitle className="text-2xl font-power-ultra">Create new link</CardTitle>
                    <Image src="/logo.webp" alt="Slab Logo" width={25} height={25} />
                </div>
                <CardDescription>We will analyze the destination link to verify if it is secure.</CardDescription>
            </CardHeader>
            <CardBody className="flex flex-col gap-y-4">
                <form>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-1.5">
                            <label htmlFor="destination-url" className="text-3.5">Name</label>
                            <Input id="destination-url" placeholder="https://" type="text" />
                        </div>
                        <div className="flex flex-col gap-y-1.5">
                            <label htmlFor="short-link" className="text-3.5">Short link</label>
                            <Input id="short-link" placeholder="mylink" type="text" />
                        </div>
                        <div className="flex flex-col gap-y-1.5">
                            <label htmlFor="short-link" className="text-3.5">Description</label>
                            <Textarea placeholder="Type your description here." className="resize-none" />
                        </div>
                    </div>
                </form>
                <div className="flex flex-col gap-y-1.5">
                    <label htmlFor="short-link" className="text-3.5">Add tags</label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectGroup>
                                <SelectItem value="apple">Tag</SelectItem>
                                <SelectItem value="banana">Tag 2</SelectItem>
                                <SelectItem value="blueberry">Third tag</SelectItem>
                                <SelectItem value="grapes">Tag 4</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardBody>
            <CardFooter className="flex justify-end gap-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create</Button>
            </CardFooter>
        </Card>
    );
}
