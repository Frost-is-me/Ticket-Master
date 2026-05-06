import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import { movies } from "@/data/movies";
import { showtimes } from "@/data/showtimes";
import { Badge } from "@/components/Badge";
import { DateTabs } from "@/components/DateTabs";
import { EmptyState } from "@/components/EmptyState";
import { formatDuration, formatTime12h, money, nextDays, sameDay } from "@/lib/format";

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === movieId);
  const dates = useMemo(() => nextDays(7), []);
  const movieShowtimes = useMemo(() => showtimes.filter((s) => s.movieId === movieId), [movieId]);

  const firstAvailable =
    dates.find((d) => movieShowtimes.some((s) => sameDay(new Date(s.startTime), d))) ?? dates[0];
  const [selectedDate, setSelectedDate] = useState<Date>(firstAvailable);

  if (!movie) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  const dayShowtimes = movieShowtimes.filter((s) => sameDay(new Date(s.startTime), selectedDate));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div>
          <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted">
            <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            {movie.genre.map((g) => (
              <Badge key={g} variant="muted">
                {g}
              </Badge>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatDuration(movie.durationMinutes)}
          </p>
          <p className="mt-4 text-sm leading-relaxed">{movie.description}</p>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <h2 className="mt-6 mb-3 text-lg font-semibold">Select Showtime</h2>
          <DateTabs
            dates={dates}
            selected={selectedDate}
            onSelect={setSelectedDate}
            hasShowtimes={(d) => movieShowtimes.some((s) => sameDay(new Date(s.startTime), d))}
          />

          <div className="mt-4">
            {dayShowtimes.length === 0 ? (
              <EmptyState
                icon={CalendarX}
                message="No showtimes available for this date. Please pick another date."
              />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {dayShowtimes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => navigate(`/booking/${s.id}`)}
                    className="flex items-center justify-between rounded-lg border bg-card p-4 text-left transition hover:border-primary hover:shadow-sm"
                  >
                    <div>
                      <div className="text-base font-semibold">{formatTime12h(s.startTime)}</div>
                      <div className="text-xs text-muted-foreground">{s.hallName}</div>
                    </div>
                    <div className="text-sm font-medium text-primary">{money(s.price)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
