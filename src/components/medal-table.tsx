import type { PlacedMedal } from "@/data/medals";

export function MedalTable({
  rows,
  caption,
}: {
  rows: PlacedMedal[];
  caption: string;
}) {
  return (
    <div className="w-full max-w-full">
      <table className="w-full table-fixed border-collapse text-left text-xs sm:text-base">
        <caption className="mb-3 text-left font-display text-xl text-ink">{caption}</caption>
        <thead>
          <tr className="bg-pitch text-vest">
            <th className="w-9 px-1 py-2 text-xs font-bold leading-tight sm:w-12 sm:text-sm">Place</th>
            <th className="px-1 py-2 text-xs font-bold sm:px-2 sm:text-sm">Country</th>
            <th className="w-9 px-0 py-2 text-center text-xs font-bold leading-tight sm:w-14 sm:text-sm">Gold</th>
            <th className="w-11 px-0 py-2 text-center text-xs font-bold leading-tight sm:w-16 sm:text-sm">Silver</th>
            <th className="w-12 px-0 py-2 text-center text-xs font-bold leading-tight sm:w-16 sm:text-sm">Bronze</th>
            <th className="w-10 px-0 py-2 text-center text-xs font-bold leading-tight sm:w-14 sm:text-sm">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.country} className="border-b border-ink/15 odd:bg-vest even:bg-gold/40">
              <td className="px-2 py-2 font-bold">{row.place}</td>
              <td className="wrap-safe px-2 py-2">{row.country}</td>
              <td className="px-1 py-2 text-center">{row.gold}</td>
              <td className="px-1 py-2 text-center">{row.silver}</td>
              <td className="px-1 py-2 text-center">{row.bronze}</td>
              <td className="px-1 py-2 text-center font-bold">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
