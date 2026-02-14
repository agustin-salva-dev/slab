import Image from "next/image";
import {
    Card,
    CardBody,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GitHub, Google } from "@/components/icons/BrandIcons";

export function LoginCard() {
    return (
        <Card className="w-3/4 md:w-sm h-fit flex flex-col md:gap-4 backdrop-blur-lg bg-white/1 shadow-xl">
            <CardHeader className="flex flex-col items-center gap-4">
                <Image src="/logo.webp" alt="Slab Logo" width={35} height={35} />
                <CardTitle className="text-lg md:text-2xl">Log in to Slab</CardTitle>
                <CardDescription className="text-3 md:text-3.5 text-center">Log in to unlock full management tools and take total control of your links.</CardDescription>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Button
                    variant="outline"
                    subject="icon-text"
                    size="sm"
                    className="flex cursor-pointer w-full gap-2! md:gap-3!"
                >
                    <Google className="size-4.5!" />
                    Continue with Google
                </Button>
                <Button
                    variant="outline"
                    subject="icon-text"
                    size="sm"
                    className="flex cursor-pointer w-full gap-2! md:gap-3!"
                >
                    <GitHub className="size-4.5!" />
                    Continue with Github
                </Button>
            </CardBody>
        </Card>
    )
}
