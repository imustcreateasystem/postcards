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
};

export default function RecommendationComposer({
  open,
  onOpenChange,
}: RecommendationComposerProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");

  const wordCount = countWords(note);
  const wordsValid = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;
  const canSubmit = category && title.trim() && wordsValid;

  const handleSubmit = () => {
    // BACKEND: POST new recommendation
    toast.success("Recommendation added.", {
      description: `"${title}" will appear in your feed shortly.`,
    });
    onOpenChange(false);
    setCategory(null);
    setTitle("");
    setSubtitle("");
    setNote("");
    setLink("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                      : "border border-stone-200 bg-white text-stone-500 hover:border-stone-400 hover:text-stone-800",
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
                className={cn(
                  "w-full rounded-lg border border-stone-200 px-3 py-2",
                  "text-sm text-stone-800 placeholder:text-stone-300",
                  "focus:border-stone-400 focus:outline-none",
                )}
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
                className={cn(
                  "w-full rounded-lg border border-stone-200 px-3 py-2",
                  "text-sm text-stone-800 placeholder:text-stone-300",
                  "focus:border-stone-400 focus:outline-none",
                )}
              />
            </Stack>

            <Stack gap={1.5}>
              <Queue itemsCenter justifyBetween>
                <label
                  className="text-xs font-medium text-stone-500"
                  htmlFor="rec-note"
                >
                  Your note (between 25 - 100 words)
                </label>
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    wordCount > MAX_WORDS
                      ? "text-red-500"
                      : wordCount >= MIN_WORDS
                        ? "text-stone-400"
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
                  "w-full resize-none rounded-lg border border-stone-200 px-3 py-2",
                  "text-sm leading-relaxed text-stone-800 placeholder:text-stone-300",
                  "focus:border-stone-400 focus:outline-none",
                )}
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
                className={cn(
                  "w-full rounded-lg border border-stone-200 px-3 py-2",
                  "text-sm text-stone-800 placeholder:text-stone-300",
                  "focus:border-stone-400 focus:outline-none",
                )}
              />
            </Stack>
          </Stack>
        </Stack>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
