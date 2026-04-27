"use client";

import {
  LayoutGrid,
  Clapperboard,
  BookOpen,
  Music2,
  UtensilsCrossed,
  MapPin,
  Package,
  Newspaper,
  Mic,
  Sparkles,
} from "lucide-react";
import { cn } from "@/ui/utils/cn";
import { Queue } from "@/ui/components/Container";

const CATEGORIES = [
  { id: "cat-all", label: "Everything", icon: LayoutGrid },
  { id: "cat-film", label: "Film", icon: Clapperboard },
  { id: "cat-book", label: "Books", icon: BookOpen },
  { id: "cat-music", label: "Music", icon: Music2 },
  { id: "cat-food", label: "Food & Drink", icon: UtensilsCrossed },
  { id: "cat-place", label: "Places", icon: MapPin },
  { id: "cat-product", label: "Products", icon: Package },
  { id: "cat-article", label: "Articles", icon: Newspaper },
  { id: "cat-podcast", label: "Podcasts", icon: Mic },
  { id: "cat-other", label: "Other", icon: Sparkles },
] as const;

export const CATEGORY_ID_TO_LABEL = Object.fromEntries(
  CATEGORIES.map(({ id, label }) => [id, label]),
);

type FeedFiltersProps = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

export default function FeedFilters({
  activeCategory,
  onCategoryChange,
}: FeedFiltersProps) {
  return (
    <Queue gap={2} wrap className="mb-6">
      {CATEGORIES.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2",
            "text-sm font-medium transition-all duration-150 active:scale-[0.97]",
            activeCategory === id
              ? "bg-stone-800 text-stone-50 shadow-sm"
              : "border border-stone-200 bg-white text-stone-500 hover:border-stone-400 hover:text-stone-800",
          )}
        >
          <Icon size={14} />
          <span>{label}</span>
        </button>
      ))}
    </Queue>
  );
}
