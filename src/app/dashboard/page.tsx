export default function Dashboard() {
    return (
        <div className="w-screen h-screen px-6 md:px-32 pb-28 pt-28">
            <div className="w-full flex gap-5 justify-center items-center text-sm font-power-med antialiased">
                <p className="cursor-pointer">My Slabs</p>
                <p className="text-my-secondary cursor-pointer">Analytics</p>
                <p className="text-my-secondary cursor-pointer">Settings</p>
            </div>
        </div>
    )
}