"use client";

import { useState } from "react";
import { Heart, Bookmark, ExternalLink, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/ui/utils/cn";
import { Queue, Stack } from "@/ui/components/Container";
import { Button } from "@/ui/components/Button";
import type { Recommendation } from "./RecommendationFeed";
import Link from "next/link";

interface RecommendationCardProps {
  rec: Recommendation;
  onLike: () => void;
  onSave: () => void;
}

export default function RecommendationCard({
  rec,
  onLike,
  onSave,
}: RecommendationCardProps) {
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLike = () => {
    setLikeAnimating(true);
    onLike();
    setTimeout(() => setLikeAnimating(false), 300);
  };

  const handleShare = () => {
    toast.success("Link copied to clipboard", {
      description: `"${rec.title}" by ${rec.user.name}`,
    });
  };

  return (
    <article
      className="overflow-hidden rounded-md border border-stone-200 bg-white"
      aria-label={`${rec.title} recommended by ${rec.user.name}`}
    >
      <Stack gap={0} className="p-5 sm:p-6">
        <Queue itemsStart justifyBetween gap={3} className="mb-4">
          <Queue itemsCenter gap={3}>
            <Queue
              center
              className="h-9 w-9 shrink-0 rounded-full bg-stone-200 text-xs font-semibold text-stone-600"
              aria-label={`Avatar for ${rec.user.name}`}
            >
              {rec.user.initials}
            </Queue>

            <Stack gap={0}>
              <Queue itemsCenter gap={2}>
                <span className="text-sm font-semibold text-stone-800">
                  {rec.user.name}
                </span>
                <span className="text-xs text-stone-400">{rec.postedAt}</span>
              </Queue>
              <Queue itemsCenter gap={1} className="mt-0.5">
                <span className="mr-1 text-xs text-stone-400">
                  {rec.totalSlots}/5 this week
                </span>
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={`dot-${rec.id}-${i}`}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      i < rec.totalSlots ? "bg-stone-400" : "bg-stone-200",
                    )}
                  />
                ))}
              </Queue>
            </Stack>
          </Queue>

          <span className="shrink-0 rounded-full border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-500">
            {rec.category}
          </span>
        </Queue>

        <Stack gap={0} className="mb-3">
          <h3 className="text-base font-semibold leading-snug text-stone-900">
            {rec.title}
          </h3>
          {rec.subtitle && (
            <p className="mt-0.5 text-sm text-stone-400">{rec.subtitle}</p>
          )}
        </Stack>

        <p className="mb-4 text-sm leading-relaxed text-stone-600">
          {rec.note}
        </p>

        <Queue itemsCenter justifyBetween>
          <Queue itemsCenter gap={1}>
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm",
                "transition-all duration-150 active:scale-[0.95]",
                rec.liked
                  ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
                  : "text-stone-400 hover:bg-rose-50 hover:text-rose-500",
              )}
              aria-label={`${rec.liked ? "Unlike" : "Like"} — ${rec.likes} likes`}
            >
              <Heart
                size={15}
                className={cn(
                  "transition-transform",
                  likeAnimating && "scale-125",
                )}
                fill={rec.liked ? "currentColor" : "none"}
              />
              <span className="font-medium">{rec.likes}</span>
            </button>

            <button
              onClick={onSave}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm",
                "transition-all duration-150 active:scale-[0.95]",
                rec.saved
                  ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  : "text-stone-400 hover:bg-stone-100 hover:text-stone-700",
              )}
              aria-label={rec.saved ? "Unsave" : "Save"}
            >
              <Bookmark size={15} fill={rec.saved ? "currentColor" : "none"} />
              <span className="text-xs font-medium">
                {rec.saved ? "Saved" : "Save"}
              </span>
            </button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              aria-label="Share"
            >
              <Share2 size={15} />
            </Button>
          </Queue>

          {rec.link && (
            <Button variant="outline" size="sm" asChild>
              <Link
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open link for ${rec.title}`}
              >
                <ExternalLink size={13} />
                View
              </Link>
            </Button>
          )}
        </Queue>
      </Stack>
    </article>
  );
}
