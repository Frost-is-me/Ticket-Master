import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X, Film, Ticket } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const cart = useAppSelector((s) => s.cart);
  const count = cart.seats.length;

  const links = (
    <>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`
        }
        onClick={() => setOpen(false)}
      >
        <Film className="h-4 w-4" />
        Movies
      </NavLink>
      <NavLink
        to="/bookings"
        className={({ isActive }) =>
          `flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`
        }
        onClick={() => setOpen(false)}
      >
        <Ticket className="h-4 w-4" />
        My Bookings
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Film className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              CineSeat
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">{links}</nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={cart.showtimeId ? `/booking/${cart.showtimeId}` : "#"}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border bg-background transition-all hover:bg-muted ${
              !cart.showtimeId && "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-background/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-4 p-6">
            {links}
          </nav>
        </div>
      )}
    </header>
  );
}
