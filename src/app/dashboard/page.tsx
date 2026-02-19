export default function Dashboard() {
    return (
        <div className="h-full py-10">
            <div className="group w-full flex gap-5 justify-center items-center font-power-ultra text-sm antialiased">
                <p className="cursor-pointer">My Slabs</p>
                <p className="text-my-secondary cursor-pointer t-color hover-white">Analytics</p>
                <p className="text-my-secondary cursor-pointer t-color hover-white">Settings</p>
            </div>
        </div>
    )
}