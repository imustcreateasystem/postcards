"use client";

import { useState } from "react";
import { Queue, Stack } from "@/ui/components/Container";
import type { UserWeek } from "@/db/user";
import { Recommendation } from "@/db/recommendations";
import FeedFilters from "./filters/FeedFilters";
import RecommendationFeed from "./recommendation-feed/RecommendationFeed";
import SuggestedCurators from "./suggested-curators/SuggestedCurators";
import WeeklyPostCTA from "./weekly-post-button/WeeklyPostButton";

type FeedContentProps = {
  initialRecs: Recommendation[];
  initialUserWeek: UserWeek;
};

function MainColumn({
  recs,
  activeCategory,
  onCategoryChange,
  onLike,
  onSave,
  onAdd,
}: {
  recs: Recommendation[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onAdd: (rec: Recommendation) => void;
}) {
  const filtered =
    activeCategory === "cat-all"
      ? recs
      : recs.filter(
          (r) =>
            r.category.toLowerCase() ===
            activeCategory.replace("cat-", "").replace("-", " & "),
        );

  return (
    <Stack gap={0} className="min-w-0 flex-1">
      <FeedFilters
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
      <RecommendationFeed
        recs={filtered}
        onLike={onLike}
        onSave={onSave}
        onAdd={onAdd}
      />
    </Stack>
  );
}

function Sidebar({
  userWeek,
  onAdd,
}: {
  userWeek: UserWeek;
  onAdd: (rec: Recommendation) => void;
}) {
  return (
    <Stack as="aside" gap={6} className="hidden w-72 shrink-0 lg:flex xl:w-80">
      <WeeklyPostCTA userWeek={userWeek} onAdd={onAdd} />
      <SuggestedCurators />
    </Stack>
  );
}

export default function FeedContent({
  initialRecs,
  initialUserWeek,
}: FeedContentProps) {
  const [recs, setRecs] = useState<Recommendation[]>(initialRecs);
  const [userWeek, setUserWeek] = useState<UserWeek>(initialUserWeek);
  const [activeCategory, setActiveCategory] = useState("cat-all");

  const handleLike = (id: string) => {
    setRecs((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              liked: !r.liked,
              likes: r.liked ? r.likes - 1 : r.likes + 1,
            }
          : r,
      ),
    );
  };

  const handleSave = (id: string) => {
    setRecs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r)),
    );
  };

  const handleAdd = (rec: Recommendation) => {
    setRecs((prev) => [rec, ...prev]);
    setUserWeek((prev) => ({
      ...prev,
      slotsUsed: Math.min(prev.slotsUsed + 1, prev.totalSlots),
    }));
  };

  return (
    <Queue
      as="main"
      gap={8}
      className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8 xl:px-10 2xl:px-16"
    >
      <MainColumn
        recs={recs}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onLike={handleLike}
        onSave={handleSave}
        onAdd={handleAdd}
      />
      <Sidebar userWeek={userWeek} onAdd={handleAdd} />
    </Queue>
  );
}
