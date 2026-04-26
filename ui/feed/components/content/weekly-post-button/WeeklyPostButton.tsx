"use client";

import { Plus, Flame } from "lucide-react";
import { cn } from "@/ui/utils/cn";
import { Queue, Stack } from "@/ui/components/Container";
import { Button } from "@/ui/components/Button";
import { useState } from "react";
import RecommendationComposer from "../composer/RecommendationComposer";

const MY_SLOTS_USED = 2;
const TOTAL_SLOTS = 5;
const STREAK = 6;

export default function WeeklyPostCTA() {
  const [composerOpen, setComposerOpen] = useState(false);

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
              {STREAK}-week streak
            </Queue>
          </Queue>

          <p className="mb-4 text-xs text-stone-500">
            Week of Apr 21 — {TOTAL_SLOTS - MY_SLOTS_USED} slots remaining
          </p>

          <Queue itemsCenter gap={2} className="mb-5">
            {Array.from({ length: TOTAL_SLOTS }, (_, i) => (
              <Queue
                key={`slot-${i}`}
                center
                className={cn(
                  "h-8 flex-1 rounded-lg border-2 text-xs font-semibold transition-all",
                  i < MY_SLOTS_USED
                    ? "border-stone-800 bg-stone-800 text-white"
                    : "border-dashed border-stone-200 text-stone-300",
                )}
              >
                {i < MY_SLOTS_USED ? i + 1 : ""}
              </Queue>
            ))}
          </Queue>

          <Button
            onClick={() => setComposerOpen(true)}
            className="w-full gap-2 py-3"
          >
            <Plus size={16} />
            Add a recommendation
          </Button>

          <p className="mt-3 text-center text-xs leading-relaxed text-stone-500">
            25–150 words per note. What have you been into?
          </p>
        </Stack>
      </Stack>

      <RecommendationComposer
        open={composerOpen}
        onOpenChange={setComposerOpen}
      />
    </>
  );
}
