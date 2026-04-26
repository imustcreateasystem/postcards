"use client";

import { useState } from "react";
import { UserPlus, Check } from "lucide-react";
import { toast } from "sonner";
import { Queue, Stack } from "@/ui/components/Container";
import { Button } from "@/ui/components/Button";

const CURATORS = [
  {
    id: "curator-001",
    name: "Adaeze Obi",
    initials: "AO",
    tagline: "Lagos · Film & architecture",
    following: false,
  },
  {
    id: "curator-002",
    name: "Ryo Matsuda",
    initials: "RM",
    tagline: "Tokyo · Music & books",
    following: false,
  },
  {
    id: "curator-003",
    name: "Beatriz Lima",
    initials: "BL",
    tagline: "Lisbon · Food & travel",
    following: false,
  },
  {
    id: "curator-004",
    name: "Kwame Asante",
    initials: "KA",
    tagline: "Accra · Design & culture",
    following: true,
  },
];

export default function SuggestedCurators() {
  const [curators, setCurators] = useState(CURATORS);

  const handleFollow = (id: string) => {
    const curator = curators.find((c) => c.id === id);
    if (!curator) return;
    setCurators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, following: !c.following } : c)),
    );
    toast.success(
      curator.following
        ? `Unfollowed ${curator.name}`
        : `Following ${curator.name}`,
      {
        description: curator.following
          ? undefined
          : "You'll see their picks in your feed.",
      },
    );
  };

  return (
    <Stack gap={0} className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="mb-1 text-sm font-semibold text-stone-800">
        People to follow
      </h2>
      <p className="mb-4 text-xs text-stone-500">Active curators this week</p>

      <Stack gap={3}>
        {curators.map((c) => (
          <Queue key={c.id} itemsCenter gap={3}>
            <Queue
              center
              className="h-9 w-9 shrink-0 rounded-full bg-stone-200 text-xs font-semibold text-stone-600"
              aria-label={`Avatar for ${c.name}`}
            >
              {c.initials}
            </Queue>

            <Stack gap={0} className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-stone-800">
                {c.name}
              </p>
              <p className="truncate text-xs text-stone-500">{c.tagline}</p>
            </Stack>

            <Button
              variant={c.following ? "outline" : "default"}
              size="xs"
              onClick={() => handleFollow(c.id)}
              aria-label={
                c.following ? `Unfollow ${c.name}` : `Follow ${c.name}`
              }
            >
              {c.following ? (
                <>
                  <Check size={11} /> Following
                </>
              ) : (
                <>
                  <UserPlus size={11} /> Follow
                </>
              )}
            </Button>
          </Queue>
        ))}
      </Stack>

      <Button variant="ghost" size="sm" className="mt-4 w-full">
        Browse all curators
      </Button>
    </Stack>
  );
}
