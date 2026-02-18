export default function Dashboard() {
    return (
        <div className="h-full py-10">
            <div className="w-full flex gap-5 justify-center items-center text-sm font-power-med antialiased tracking-wider">
                <p className="font-power-ultra cursor-pointer">My Slabs</p>
                <p className="text-my-secondary cursor-pointer">Analytics</p>
                <p className="text-my-secondary cursor-pointer">Settings</p>
            </div>
        </div>
    )
}