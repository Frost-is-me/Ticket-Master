import { useEffect, useState } from "react";

export function CountdownTimer({
  expiresAt,
  onExpire,
}: {
  expiresAt: string;
  onExpire: () => void;
}) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, new Date(expiresAt).getTime() - Date.now()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const r = Math.max(0, new Date(expiresAt).getTime() - Date.now());
      setRemaining(r);
      if (r === 0) {
        clearInterval(id);
        onExpire();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAt, onExpire]);

  const total = Math.floor(remaining / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return (
    <span className="font-mono tabular-nums">
      {m.toString().padStart(2, "0")}:{s.toString().padStart(2, "0")}
    </span>
  );
}
