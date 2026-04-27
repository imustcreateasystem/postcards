"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Queue, Stack } from "@/ui/components/Container";
import { Button } from "@/ui/components/Button";
import RecommendationCard from "./RecommendationCard";
import RecommendationComposer from "../composer/RecommendationComposer";
import { Recommendation } from "@/db/recommendations";

type RecommendationFeedProps = {
  recs: Recommendation[];
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onAdd: (rec: Recommendation) => void;
};

export default function RecommendationFeed({
  recs,
  onLike,
  onSave,
  onAdd,
}: RecommendationFeedProps) {
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <>
      <Stack gap={4}>
        <Queue itemsCenter justifyBetween>
          <span className="text-sm text-stone-400">
            {recs.length} recommendation{recs.length !== 1 ? "s" : ""} this week
          </span>
          <Button size="sm" onClick={() => setComposerOpen(true)}>
            <Plus size={14} />
            Add yours
          </Button>
        </Queue>

        {recs.length === 0 ? (
          <p className="py-12 text-center text-sm text-stone-400">
            Nothing here yet.
          </p>
        ) : (
          recs.map((rec) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              onLike={() => onLike(rec.id)}
              onSave={() => onSave(rec.id)}
            />
          ))
        )}
      </Stack>

      <RecommendationComposer
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onAdd={onAdd}
      />
    </>
  );
}
