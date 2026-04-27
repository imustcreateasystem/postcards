import { Stack, Queue } from "@/ui/components/Container";
import { cn } from "@/ui/utils/cn";
import { APP_NAME } from "@/lib/constants/brand";

const SAMPLE_CARDS = [
  {
    id: "sample-card-1",
    user: "Mira O.",
    category: "Film",
    title: "All of Us Strangers",
    note: "Quietly devastating. Watch it alone.",
    tilt: "-rotate-2",
  },
  {
    id: "sample-card-2",
    user: "James K.",
    category: "Book",
    title: "Outline — Rachel Cusk",
    note: "A novel that listens instead of speaks.",
    tilt: "rotate-1",
  },
  {
    id: "sample-card-3",
    user: "Priya N.",
    category: "Place",
    title: "Café Cometa, Barcelona",
    note: "The best cortado I have ever had.",
    tilt: "-rotate-1",
  },
];

export default function AuthBrand() {
  return (
    <Stack
      justifyBetween
      className="hidden md:flex w-120 xl:w-135 min-h-screen bg-stone-800 px-12 py-14 relative overflow-hidden"
    >
      {/* Logo row */}
      <Queue itemsCenter gap={3} className="mt-4">
        <div className="size-9 rounded bg-stone-600" />
        <span className="text-stone-100 text-xl font-semibold tracking-tight">
          {APP_NAME}
        </span>
      </Queue>

      {/* Hero copy + sample cards */}
      <Stack gap={8} className="flex-1 justify-center">
        <Stack gap={4}>
          <p className="text-stone-300 text-xs font-medium tracking-widest uppercase">
            Five things. Every week.
          </p>
          <Stack gap={2}>
            <h1 className="text-stone-100 text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              What have you been into lately?
            </h1>
            <p className="text-stone-300 text-base leading-relaxed">
              Share up to five recommendations a week—a film, a book, a place,
              anything—with a short honest note. Browse what people you trust
              are discovering.
            </p>
          </Stack>
        </Stack>

        {/* Sample cards stack */}
        <div className="relative h-52 mt-4">
          {SAMPLE_CARDS.map((card, i) => (
            <Stack
              key={card.id}
              gap={2}
              className={cn(
                "absolute w-64 rounded border border-stone-200 bg-white p-4",
                card.tilt,
              )}
              style={{ top: `${i * 14}px`, left: `${i * 8}px`, zIndex: i }}
            >
              <Queue itemsCenter justifyBetween>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-200 text-stone-600">
                  {card.category}
                </span>
                <span className="text-xs text-stone-500">{card.user}</span>
              </Queue>
              <p className="text-sm font-semibold text-stone-800 leading-tight">
                {card.title}
              </p>
              <p className="text-xs text-stone-500 leading-relaxed">
                {card.note}
              </p>
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Bottom tagline */}
      <Queue itemsCenter gap={2}>
        <div className="h-px flex-1 bg-stone-400" />
        <p className="text-stone-300 text-xs tracking-wider uppercase">
          Our tagline.
        </p>
        <div className="h-px flex-1 bg-stone-400" />
      </Queue>
    </Stack>
  );
}
