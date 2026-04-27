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
import { Input } from "@/ui/components/Input";
import { Label } from "@/ui/components/Label";
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
          {/* Category picker */}
          <Stack gap={1.5}>
            <Label>Category</Label>
            <Queue gap={1.5} wrap>
              {CATEGORIES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded px-3 py-1.5",
                    "text-xs font-medium border",
                    category === id
                      ? "border-stone-600 bg-stone-600 text-stone-50"
                      : "border-stone-300 bg-stone-50 text-stone-500 hover:border-stone-400 hover:text-stone-700",
                  )}
                >
                  <Icon size={11} />
                  {label}
                </button>
              ))}
            </Queue>
          </Stack>

          {/* Fields */}
          <Stack gap={3}>
            <Stack gap={1.5}>
              <Label htmlFor="rec-title">Title</Label>
              <Input
                id="rec-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What are you recommending?"
                grow
              />
            </Stack>

            <Stack gap={1.5}>
              <Label htmlFor="rec-subtitle">
                Subtitle{" "}
                <span className="font-normal text-stone-400">(optional)</span>
              </Label>
              <Input
                id="rec-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Author, year, location…"
                grow
              />
            </Stack>

            <Stack gap={1.5}>
              <Queue itemsCenter justifyBetween>
                <Label htmlFor="rec-note">Your note</Label>
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    wordCount > MAX_WORDS
                      ? "text-red-400"
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
                className={cn(
                  "w-full rounded px-3 py-2 resize-none leading-relaxed",
                  "border border-stone-300 bg-stone-50",
                  "text-sm text-stone-700 placeholder:text-stone-400",
                  "hover:border-stone-400",
                  "focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-300",
                  "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400",
                )}
              />
            </Stack>

            <Stack gap={1.5}>
              <Label htmlFor="rec-link">
                Link{" "}
                <span className="font-normal text-stone-400">(optional)</span>
              </Label>
              <Input
                id="rec-link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://…"
                grow
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
