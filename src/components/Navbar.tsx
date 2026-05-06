import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const cart = useAppSelector((s) => s.cart);
  const count = cart.seats.length;

  const links = (
    <>
      <Link
        to="/"
        activeOptions={{ exact: true }}
        className="text-sm font-medium hover:text-primary"
        activeProps={{ className: "text-primary" }}
        onClick={() => setOpen(false)}
      >
        Movies
      </Link>
      <Link
        to="/bookings"
        className="text-sm font-medium hover:text-primary"
        activeProps={{ className: "text-primary" }}
        onClick={() => setOpen(false)}
      >
        My Bookings
      </Link>
      {cart.showtimeId ? (
        <Link
          to="/booking/$showtimeId"
          params={{ showtimeId: String(cart.showtimeId) }}
          className="relative inline-flex items-center"
          onClick={() => setOpen(false)}
          aria-label="Cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      ) : (
        <span className="relative inline-flex items-center text-muted-foreground">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </span>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight">
          CineSeat
        </Link>
        <nav className="hidden items-center gap-6 md:flex">{links}</nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">{links}</nav>
        </div>
      )}
    </header>
  );
}
