export default function PropertyCardSkeleton() {
    return (
        <div
            className="relative flex flex-col bg-white overflow-hidden border border-zinc-100"
            style={{ borderRadius: "2.5rem" }}
        >
            {/* Image area */}
            <div className="relative w-full h-[15rem] md:h-[30rem] bg-zinc-200 animate-pulse">
                {/* Arrow button placeholder */}
                <div className="absolute top-3 right-5 bg-zinc-300 p-3 md:p-5 rounded-3xl w-10 h-10 md:w-16 md:h-16" />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        {/* Title */}
                        <div className="h-6 w-40 bg-zinc-600/60 rounded-full animate-pulse" />
                        {/* Location */}
                        <div className="h-3 w-24 bg-zinc-600/40 rounded-full animate-pulse" />
                    </div>
                    {/* Price badge */}
                    <div className="h-7 w-20 bg-zinc-300/60 rounded-full animate-pulse" />
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 pt-3">
                    <div className="h-3 w-16 bg-zinc-600/40 rounded-full animate-pulse" />
                    <div className="h-3 w-14 bg-zinc-600/40 rounded-full animate-pulse" />
                    <div className="h-3 w-16 bg-zinc-600/40 rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    );
}