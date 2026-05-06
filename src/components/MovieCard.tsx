import { Link } from "react-router-dom";
import type { Movie } from "@/data/movies";
import { Badge } from "./Badge";
import { formatDuration } from "@/lib/format";
import { Play } from "lucide-react";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        {/* Hover Overlay with Blur and Start (Play) Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-current" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 font-semibold transition-colors group-hover:text-primary">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {movie.genre.map((g) => (
            <Badge key={g} variant="muted">
              {g}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{formatDuration(movie.durationMinutes)}</p>
      </div>
    </Link>
  );
}
