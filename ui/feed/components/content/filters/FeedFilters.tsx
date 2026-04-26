"use client";

import { useState } from "react";
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

type FeedFiltersProps = {
  onCategoryChange?: (cat: string) => void;
};

export default function FeedFilters({ onCategoryChange }: FeedFiltersProps) {
  const [active, setActive] = useState("cat-all");

  const handleSelect = (id: string) => {
    setActive(id);
    onCategoryChange?.(id);
  };

  return (
    <Queue gap={2} wrap className="mb-6">
      {CATEGORIES.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => handleSelect(id)}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full",
              "text-sm font-medium transition-all duration-150 active:scale-[0.97]",
              isActive
                ? "bg-stone-800 text-stone-50 shadow-sm"
                : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400 hover:text-stone-800",
            )}
          >
            <Icon size={14} />
            <span>{label}</span>
          </button>
        );
      })}
    </Queue>
  );
}
