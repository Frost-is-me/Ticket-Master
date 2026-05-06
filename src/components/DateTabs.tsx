import { formatDateTab, sameDay } from "@/lib/format";

export function DateTabs({
  dates,
  selected,
  onSelect,
  hasShowtimes,
}: {
  dates: Date[];
  selected: Date;
  onSelect: (d: Date) => void;
  hasShowtimes: (d: Date) => boolean;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {dates.map((d) => {
        const enabled = hasShowtimes(d);
        const active = sameDay(d, selected);
        return (
          <button
            key={d.toISOString()}
            disabled={!enabled}
            onClick={() => enabled && onSelect(d)}
            className={`shrink-0 rounded-md border px-3 py-2 text-sm transition ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : enabled
                  ? "border-border bg-card hover:border-primary"
                  : "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-50"
            }`}
          >
            {formatDateTab(d)}
          </button>
        );
      })}
    </div>
  );
}
