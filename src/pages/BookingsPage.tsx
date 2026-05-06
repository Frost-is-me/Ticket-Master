import { useEffect, useState } from "react";
import { Ticket } from "lucide-react";
import { getBookings, type Booking } from "@/lib/bookings";
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { formatLongDate, money } from "@/lib/format";

export function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const all = getBookings().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setBookings(all);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Bookings</h1>
      {bookings.length === 0 ? (
        <EmptyState
          icon={Ticket}
          message="No bookings yet"
          actionLabel="Browse Movies"
          actionHref="/"
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row"
            >
              <img
                src={b.moviePoster}
                alt={b.movieTitle}
                className="h-32 w-24 shrink-0 rounded object-cover"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="font-semibold">{b.movieTitle}</h2>
                    <p className="text-sm text-muted-foreground">
                      {formatLongDate(b.showtimeDate)} · {b.showtimeTime} · {b.hallName}
                    </p>
                  </div>
                  <Badge variant="success">{b.status}</Badge>
                </div>
                <p className="mt-2 text-sm">
                  Seats: {b.seats.map((s) => `${s.rowLabel}${s.seatNumber}`).join(", ")}
                </p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{b.bookingRef}</span>
                  <span className="font-semibold">{money(b.totalPrice)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
