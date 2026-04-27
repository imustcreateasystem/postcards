"use client";

import { useState } from "react";
import { Plus, Flame } from "lucide-react";
import { cn } from "@/ui/utils/cn";
import { Queue, Stack } from "@/ui/components/Container";
import { Button } from "@/ui/components/Button";
import type { UserWeek } from "@/db/user";
import { Recommendation } from "@/db/recommendations";
import RecommendationComposer from "../composer/RecommendationComposer";

type WeeklyPostCTAProps = {
  userWeek: UserWeek;
  onAdd: (rec: Recommendation) => void;
};

export default function WeeklyPostCTA({ userWeek, onAdd }: WeeklyPostCTAProps) {
  const [composerOpen, setComposerOpen] = useState(false);
  const { slotsUsed, totalSlots, streak, weekLabel } = userWeek;
  const isFull = slotsUsed >= totalSlots;

  return (
    <>
      <Stack
        gap={0}
        className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
      >
        <Stack gap={0} className="p-5">
          <Queue itemsCenter justifyBetween className="mb-1">
            <h2 className="text-sm font-semibold text-stone-800">Your week</h2>
            <Queue
              itemsCenter
              gap={1}
              className="text-xs font-medium text-stone-500"
            >
              <Flame size={13} />
              {streak}-week streak
            </Queue>
          </Queue>

          <p className="mb-4 text-xs text-stone-500">
            Week of {weekLabel} —{" "}
            {isFull
              ? "all slots used"
              : `${totalSlots - slotsUsed} slots remaining`}
          </p>

          <Queue itemsCenter gap={2} className="mb-5">
            {Array.from({ length: totalSlots }, (_, i) => (
              <Queue
                key={`slot-${i}`}
                center
                className={cn(
                  "h-8 flex-1 rounded-lg border-2 text-xs font-semibold transition-all",
                  i < slotsUsed
                    ? "border-stone-800 bg-stone-800 text-white"
                    : "border-dashed border-stone-200 text-stone-300",
                )}
              >
                {i < slotsUsed ? i + 1 : ""}
              </Queue>
            ))}
          </Queue>

          <Button
            onClick={() => setComposerOpen(true)}
            disabled={isFull}
            className="w-full gap-2 py-3"
          >
            <Plus size={16} />
            {isFull ? "All slots used this week" : "Add a recommendation"}
          </Button>

          {!isFull && (
            <p className="mt-3 text-center text-xs leading-relaxed text-stone-500">
              25–150 words per note. What have you been into?
            </p>
          )}
        </Stack>
      </Stack>

      <RecommendationComposer
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onAdd={onAdd}
      />
    </>
  );
}
