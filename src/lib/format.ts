export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
}

export function formatTime12h(iso: string) {
  const d = new Date(iso);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDateTab(d: Date) {
  return `${DAYS[d.getDay()]} ${d.getDate()}`;
}

export function formatLongDate(iso: string) {
  const d = new Date(iso);
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function nextDays(count: number): Date[] {
  const out: Date[] = [];
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(t);
    d.setDate(d.getDate() + i);
    out.push(d);
  }
  return out;
}
