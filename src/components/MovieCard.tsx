import { Link } from "react-router-dom";
import type { Movie } from "@/data/movies";
import { Badge } from "./Badge";
import { formatDuration } from "@/lib/format";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 font-semibold">{movie.title}</h3>
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
