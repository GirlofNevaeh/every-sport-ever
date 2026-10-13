import { faceSrc } from "@/data/faces";
import type { Star } from "@/data/types";

export function StarPortrait({
  person,
  className = "h-32 w-32",
}: {
  person: Star;
  className?: string;
}) {
  return (
    <span className={`grid shrink-0 place-items-center overflow-hidden bg-vest ${className}`}>
      <img
        src={faceSrc(person)}
        alt=""
        width={512}
        height={512}
        loading="eager"
        decoding="sync"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
