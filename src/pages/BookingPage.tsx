import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, X, CheckCircle2 } from "lucide-react";
import { showtimes } from "@/data/showtimes";
import { movies } from "@/data/movies";
import { getSeatsForShowtime, type Seat } from "@/data/seats";
import { ScreenIndicator } from "@/components/ScreenIndicator";
import { SeatMap } from "@/components/SeatMap";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CountdownTimer } from "@/components/CountdownTimer";
import { useToast } from "@/components/Toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSeat, removeSeat, clearCart, setExpiry } from "@/store/cartSlice";
import { formatLongDate, formatTime12h, money } from "@/lib/format";
import { generateBookingRef, generateId, saveBooking } from "@/lib/bookings";

export function BookingPage() {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const id = Number(showtimeId);
  const showtime = showtimes.find((s) => s.id === id);
  const movie = showtime ? movies.find((m) => m.id === showtime.movieId) : null;

  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const cart = useAppSelector((s) => s.cart);

  const [seats, setSeats] = useState<Seat[]>(() =>
    showtime ? getSeatsForShowtime(showtime.id) : [],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmed, setConfirmed] = useState<{ ref: string } | null>(null);

  useEffect(() => {
    if (showtime) setSeats(getSeatsForShowtime(showtime.id));
  }, [showtime?.id]);

  const selectedKeys = useMemo(() => {
    if (cart.showtimeId !== id) return new Set<string>();
    return new Set(cart.seats.map((s) => `${s.rowLabel}-${s.seatNumber}`));
  }, [cart, id]);

  const selectedSeats = cart.showtimeId === id ? cart.seats : [];
  const total = selectedSeats.length * (showtime?.price ?? 0);

  if (!showtime || !movie) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Showtime not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  const handleToggle = (seat: Seat) => {
    const key = `${seat.rowLabel}-${seat.seatNumber}`;
    if (selectedKeys.has(key)) {
      dispatch(removeSeat({ rowLabel: seat.rowLabel, seatNumber: seat.seatNumber }));
      toast("Seat removed", "info");
    } else {
      dispatch(
        addSeat({ showtimeId: id, seat: { rowLabel: seat.rowLabel, seatNumber: seat.seatNumber } }),
      );
      toast("Seat added", "success");
    }
  };

  const handleHold = () => {
    const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    dispatch(setExpiry(expires));
    setModalOpen(true);
  };

  const handleExpire = () => {
    dispatch(clearCart());
    setSeats(getSeatsForShowtime(id));
    setModalOpen(false);
    toast("Time expired. Seats released.", "warning");
  };

  const handleConfirm = () => {
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email");
      return;
    }
    const ref = generateBookingRef();
    saveBooking({
      id: generateId(),
      movieTitle: movie.title,
      moviePoster: movie.posterUrl,
      showtimeDate: showtime.startTime,
      showtimeTime: formatTime12h(showtime.startTime),
      hallName: showtime.hallName,
      seats: selectedSeats,
      totalPrice: total,
      bookingRef: ref,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    });
    setConfirmed({ ref });
    setModalOpen(false);
    dispatch(clearCart());
    toast("Booking confirmed!", "success");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link
        to={`/movies/${movie.id}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="text-sm text-muted-foreground">
          {formatLongDate(showtime.startTime)} · {formatTime12h(showtime.startTime)} ·{" "}
          {showtime.hallName}
        </p>
      </div>

      {confirmed && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold">Booking Confirmed!</p>
            <p className="text-sm text-muted-foreground">
              Reference: <span className="font-mono">{confirmed.ref}</span>.{" "}
              <Link to="/bookings" className="text-primary hover:underline">
                View bookings
              </Link>
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <ScreenIndicator />
          <SeatMap seats={seats} selected={selectedKeys} onToggle={handleToggle} />
        </div>

        <aside className="rounded-lg border bg-card p-4">
          <h2 className="font-semibold">Your Selection</h2>

          {cart.expiresAt && cart.showtimeId === id && (
            <div className="mt-3 rounded-md bg-muted p-3 text-sm">
              <div className="text-xs text-muted-foreground">
                Time remaining to complete booking
              </div>
              <div className="mt-1 text-lg">
                <CountdownTimer expiresAt={cart.expiresAt} onExpire={handleExpire} />
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2">
            {selectedSeats.length === 0 ? (
              <p className="text-sm text-muted-foreground">No seats selected</p>
            ) : (
              selectedSeats.map((s) => (
                <div
                  key={`${s.rowLabel}-${s.seatNumber}`}
                  className="flex items-center justify-between rounded border bg-background px-3 py-2 text-sm"
                >
                  <span>
                    Row {s.rowLabel}, Seat {s.seatNumber} — {money(showtime.price)}
                  </span>
                  <button
                    onClick={() => handleToggle({ ...s, status: "available" } as Seat)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove seat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">{money(total)}</span>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={handleHold}
            className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {selectedSeats.length === 0
              ? "Select seats to continue"
              : `Hold Seats — ${money(total)}`}
          </button>
        </aside>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm your booking"
      >
        <p className="text-sm text-muted-foreground">
          You are reserving {selectedSeats.length} seat{selectedSeats.length === 1 ? "" : "s"} for{" "}
          {movie.title} at {formatTime12h(showtime.startTime)}.
        </p>
        <ul className="mt-3 max-h-40 overflow-auto rounded border bg-muted/30 p-2 text-sm">
          {selectedSeats.map((s) => (
            <li key={`${s.rowLabel}-${s.seatNumber}`}>
              Row {s.rowLabel}, Seat {s.seatNumber}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
          />
          {emailError && <p className="mt-1 text-xs text-destructive">{emailError}</p>}
        </div>
        <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold">{money(total)}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setModalOpen(false)}
            className="flex-1 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Confirm Booking
          </button>
        </div>
      </ConfirmationModal>
    </div>
  );
}
