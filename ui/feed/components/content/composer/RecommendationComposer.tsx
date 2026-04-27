"use client";

import { useState } from "react";
import {
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
import { toast } from "sonner";
import { cn } from "@/ui/utils/cn";
import { Queue, Stack } from "@/ui/components/Container";
import { Button } from "@/ui/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/ui/components/Dialog";
import { Recommendation } from "@/db/recommendations";

const CATEGORIES = [
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

const MIN_WORDS = 25;
const MAX_WORDS = 150;

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const inputClass = cn(
  "w-full rounded-lg border border-stone-200 px-3 py-2",
  "text-sm text-stone-800 placeholder:text-stone-300",
  "focus:border-stone-500 focus:outline-none",
);

type RecommendationComposerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (rec: Recommendation) => void;
};

export default function RecommendationComposer({
  open,
  onOpenChange,
  onAdd,
}: RecommendationComposerProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");

  const wordCount = countWords(note);
  const wordsValid = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;
  const canSubmit = category !== null && title.trim() !== "" && wordsValid;

  const reset = () => {
    setCategory(null);
    setTitle("");
    setSubtitle("");
    setNote("");
    setLink("");
  };

  const handleSubmit = () => {
    if (!canSubmit || !category) return;
    const categoryLabel =
      CATEGORIES.find((c) => c.id === category)?.label ?? "";
    onAdd({
      id: `rec-${Date.now()}`,
      user: { id: "user-mo", name: "Mira Okafor", initials: "MO" },
      weekSlot: 0,
      totalSlots: 5,
      category: categoryLabel,
      title,
      subtitle,
      note,
      likes: 0,
      liked: false,
      saved: false,
      postedAt: "just now",
      link: link.trim() || null,
    });
    toast.success("Recommendation added.", {
      description: `"${title}" is now in the feed.`,
    });
    onOpenChange(false);
    reset();
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a recommendation</DialogTitle>
          <DialogDescription>
            25–150 words. What have you been into this week?
          </DialogDescription>
        </DialogHeader>

        <Stack gap={4}>
          <Stack gap={1.5}>
            <span className="text-xs font-medium text-stone-500">Category</span>
            <Queue gap={1.5} wrap>
              {CATEGORIES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                    "text-xs font-medium transition-all duration-150",
                    category === id
                      ? "bg-stone-800 text-stone-50"
                      : "border border-stone-200 bg-white text-stone-500 hover:border-stone-500 hover:text-stone-800",
                  )}
                >
                  <Icon size={11} />
                  {label}
                </button>
              ))}
            </Queue>
          </Stack>

          <Stack gap={3}>
            <Stack gap={1.5}>
              <label
                className="text-xs font-medium text-stone-500"
                htmlFor="rec-title"
              >
                Title
              </label>
              <input
                id="rec-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What are you recommending?"
                className={inputClass}
              />
            </Stack>

            <Stack gap={1.5}>
              <label
                className="text-xs font-medium text-stone-500"
                htmlFor="rec-subtitle"
              >
                Subtitle{" "}
                <span className="font-normal text-stone-300">(optional)</span>
              </label>
              <input
                id="rec-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Author, year, location…"
                className={inputClass}
              />
            </Stack>

            <Stack gap={1.5}>
              <Queue itemsCenter justifyBetween>
                <label
                  className="text-xs font-medium text-stone-500"
                  htmlFor="rec-note"
                >
                  Your note
                </label>
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    wordCount > MAX_WORDS
                      ? "text-red-500"
                      : wordCount >= MIN_WORDS
                        ? "text-stone-500"
                        : "text-stone-300",
                  )}
                >
                  {wordCount} / {MAX_WORDS}
                </span>
              </Queue>
              <textarea
                id="rec-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Why does this deserve someone's time?"
                rows={5}
                className={cn(inputClass, "resize-none leading-relaxed")}
              />
            </Stack>

            <Stack gap={1.5}>
              <label
                className="text-xs font-medium text-stone-500"
                htmlFor="rec-link"
              >
                Link{" "}
                <span className="font-normal text-stone-300">(optional)</span>
              </label>
              <input
                id="rec-link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://…"
                className={inputClass}
              />
            </Stack>
          </Stack>
        </Stack>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!canSubmit} onClick={handleSubmit}>
            Post recommendation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
