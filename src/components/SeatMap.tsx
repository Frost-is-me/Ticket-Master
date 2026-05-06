import type { Seat } from "@/data/seats";
import { SEATS_PER_ROW_COUNT } from "@/data/seats";

type SeatStatus = "available" | "selected" | "taken";

function seatStyle(status: SeatStatus): React.CSSProperties {
  if (status === "selected")
    return { backgroundColor: "var(--seat-selected)", color: "var(--seat-selected-foreground)" };
  if (status === "taken")
    return { backgroundColor: "var(--seat-taken)", color: "var(--seat-taken-foreground)" };
  return { backgroundColor: "var(--seat-available)", color: "var(--seat-available-foreground)" };
}

export function SeatMap({
  seats,
  selected,
  onToggle,
}: {
  seats: Seat[];
  selected: Set<string>;
  onToggle: (seat: Seat) => void;
}) {
  const rows: Record<string, Seat[]> = {};
  seats.forEach((s) => {
    rows[s.rowLabel] ||= [];
    rows[s.rowLabel].push(s);
  });

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <div className="mx-auto inline-block">
          {Object.entries(rows).map(([row, rowSeats]) => (
            <div key={row} className="mb-1.5 flex items-center gap-2">
              <div className="w-6 text-center text-xs font-medium text-muted-foreground">{row}</div>
              <div
                className="grid gap-1.5 sm:gap-2"
                style={{ gridTemplateColumns: `repeat(${SEATS_PER_ROW_COUNT}, minmax(0, 1fr))` }}
              >
                {rowSeats.map((s) => {
                  const key = `${s.rowLabel}-${s.seatNumber}`;
                  const isSelected = selected.has(key);
                  const status: SeatStatus = isSelected ? "selected" : s.status;
                  const isTaken = s.status === "taken";
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={isTaken}
                      onClick={() => !isTaken && onToggle(s)}
                      style={seatStyle(status)}
                      className={`h-7 w-7 rounded text-[10px] font-medium transition sm:h-8 sm:w-8 sm:text-xs ${
                        isTaken
                          ? "cursor-not-allowed opacity-70"
                          : "cursor-pointer hover:opacity-80"
                      }`}
                      aria-label={`Row ${s.rowLabel} Seat ${s.seatNumber} ${status}`}
                    >
                      {s.seatNumber}
                    </button>
                  );
                })}
              </div>
              <div className="w-6 text-center text-xs font-medium text-muted-foreground">{row}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
        <Legend label="Available" style={seatStyle("available")} />
        <Legend label="Selected" style={seatStyle("selected")} />
        <Legend label="Taken" style={seatStyle("taken")} />
      </div>
    </div>
  );
}

function Legend({ label, style }: { label: string; style: React.CSSProperties }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded" style={style} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
