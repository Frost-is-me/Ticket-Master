import { useEffect, useState } from "react";
import { Film, TrendingUp } from "lucide-react";
import { movies } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";
import { Skeleton } from "@/components/Skeleton";
import { EmptyState } from "@/components/EmptyState";

export function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
            <TrendingUp className="h-4 w-4" />
            <span>Trending Now</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Now Showing</h1>
        </div>
        {/* Genre Filter Bar (Kept as requested) */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["All", "Action", "Sci-Fi", "Animation", "Drama", "Comedy"].map((genre) => (
            <button
              key={genre}
              className="rounded-full px-4 py-1.5 text-sm font-medium border bg-card hover:border-primary transition-all whitespace-nowrap"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <EmptyState icon={Film} message="No movies currently showing" />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((m) => (
            <div key={m.id} className="group transition-all duration-300 hover:-translate-y-2">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
