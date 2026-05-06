import { Routes, Route, Navigate } from "react-router-dom";
import { ReduxProvider } from "@/store/Provider";
import { ToastProvider } from "@/components/Toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { MovieDetailPage } from "@/pages/MovieDetailPage";
import { BookingPage } from "@/pages/BookingPage";
import { BookingsPage } from "@/pages/BookingsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
  return (
    <ReduxProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/:movieId" element={<MovieDetailPage />} />
              <Route path="/booking/:showtimeId" element={<BookingPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </ReduxProvider>
  );
}
