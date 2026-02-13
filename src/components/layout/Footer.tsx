import { MessageCircleHeart, Squircle } from 'lucide-react';
import { GitHub, LinkedIn } from "@/components/icons/BrandIcons";
import { Separator } from "@/components/ui/Separator";


export default function Footer() {
    return (
        <footer className="absolute bottom-0 w-screen py-3.5 px-32 bg-my-primary flex items-center justify-between text-xs font-bold">
            <section className='flex items-center gap-3.5'>
                <MessageCircleHeart className="text-(--color-my-accents-red)" size={20} />
                <p><span className="font-normal">Made by</span> <span className="cursor-pointer">Agvstindev</span> <span className="text-my-secondary font-normal">- inspired by Slug: by <span className="font-bold">Pheralb</span></span></p>
            </section>
            <section className="flex items-center gap-12 text-my-secondary">
                <div className="group flex items-center gap-3.5 cursor-pointer">
                    <p className="t-color group-white">My profile</p>
                    <GitHub className="size-5" />
                </div>
                <div className="group flex items-center gap-3.5 cursor-pointer">
                    <p className="t-color group-white">Contact me</p>
                    <LinkedIn className="size-5" />
                </div>
            </section>
            <section className="flex items-center gap-12">
                <div className="flex items-center gap-3.5">
                    <Squircle className="fill-my-accents-yellow stroke-0 size-3" />
                    <p>Status <span className="font-normal text-my-secondary">: In Development</span></p>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <p>v0.1.0</p>
            </section>
        </footer>
    )
}