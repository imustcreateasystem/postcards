"use client";

import { useState } from "react";
import { Stack } from "@/ui/components/Container";
import RecommendationCard from "./RecommendationCard";

export type Recommendation = {
  id: string;
  user: { id: string; name: string; initials: string };
  weekSlot: number;
  totalSlots: number;
  category: string;
  title: string;
  subtitle: string;
  note: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  postedAt: string;
  link: string | null;
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec-001",
    user: { id: "user-mira", name: "Mira Okafor", initials: "MO" },
    weekSlot: 1,
    totalSlots: 5,
    category: "Film",
    title: "All of Us Strangers",
    subtitle: "Andrew Haigh, 2023",
    note: "Genuinely affecting. Haigh is precise about a kind of loneliness that is hard to articulate and harder to film. Stayed with me longer than I expected.",
    likes: 34,
    liked: false,
    saved: false,
    postedAt: "2 hours ago",
    link: "https://www.imdb.com/title/tt13320662/",
  },
  {
    id: "rec-002",
    user: { id: "user-james", name: "James Kimani", initials: "JK" },
    weekSlot: 3,
    totalSlots: 4,
    category: "Book",
    title: "Outline",
    subtitle: "Rachel Cusk, 2014",
    note: "Structurally unusual — the narrator recedes and other people fill the space. Worth it if you find conventional first-person fiction limiting. The trilogy gets better as it goes.",
    likes: 21,
    liked: true,
    saved: true,
    postedAt: "4 hours ago",
    link: "https://www.goodreads.com/book/show/22749723",
  },
  {
    id: "rec-003",
    user: { id: "user-priya", name: "Priya Nair", initials: "PN" },
    weekSlot: 2,
    totalSlots: 5,
    category: "Music",
    title: "Bright Future",
    subtitle: "Adrianne Lenker, 2024",
    note: "Sparse and well-recorded. Voice and acoustic guitar, not much else. Good for long train journeys or doing nothing in particular.",
    likes: 47,
    liked: false,
    saved: false,
    postedAt: "5 hours ago",
    link: null,
  },
  {
    id: "rec-004",
    user: { id: "user-sol", name: "Sol Bernstein", initials: "SB" },
    weekSlot: 1,
    totalSlots: 3,
    category: "Place",
    title: "Café de Flore",
    subtitle: "Saint-Germain-des-Prés, Paris",
    note: "Overpriced and full of tourists, which is fine. The hot chocolate is good and the people-watching is better. Worth one visit.",
    likes: 18,
    liked: false,
    saved: true,
    postedAt: "7 hours ago",
    link: null,
  },
  {
    id: "rec-005",
    user: { id: "user-tariq", name: "Tariq Hassan", initials: "TH" },
    weekSlot: 4,
    totalSlots: 5,
    category: "Article",
    title: "The Tyranny of the Algorithm",
    subtitle: "The Atlantic, Apr 2025",
    note: "Makes a reasonable case that human curation and algorithmic recommendation are qualitatively different things, not just different in degree. Useful framing.",
    likes: 63,
    liked: true,
    saved: false,
    postedAt: "9 hours ago",
    link: "https://www.theatlantic.com",
  },
  {
    id: "rec-006",
    user: { id: "user-elena", name: "Elena Vasquez", initials: "EV" },
    weekSlot: 2,
    totalSlots: 5,
    category: "Product",
    title: "Leuchtturm1917 A5",
    subtitle: "Dotted hardcover notebook",
    note: "Better paper than Moleskine, better size than Field Notes. The dot grid is subtle enough to ignore. Works with fountain pens without bleedthrough.",
    likes: 29,
    liked: false,
    saved: false,
    postedAt: "11 hours ago",
    link: "https://www.leuchtturm1917.com",
  },
  {
    id: "rec-007",
    user: { id: "user-noah", name: "Noah Takahashi", initials: "NT" },
    weekSlot: 5,
    totalSlots: 5,
    category: "Food & Drink",
    title: "Shiromaru Classic — Ippudo Westside",
    subtitle: "New York, NY",
    note: "Good tonkotsu. Get the extra chashu. The line moves faster than it looks.",
    likes: 38,
    liked: false,
    saved: true,
    postedAt: "14 hours ago",
    link: null,
  },
  {
    id: "rec-008",
    user: { id: "user-cleo", name: "Cleo Fontaine", initials: "CF" },
    weekSlot: 3,
    totalSlots: 4,
    category: "Podcast",
    title: 'Decoder Ring — "The Wellness Trap"',
    subtitle: "Slate, Mar 2025",
    note: "Paskin traces how wellness became a consumer category. The cold plunge segment is particularly good — she tracks a widely-cited study back to its actual findings, which are much narrower than reported.",
    likes: 22,
    liked: false,
    saved: false,
    postedAt: "18 hours ago",
    link: "https://slate.com/podcasts/decoder-ring",
  },
  {
    id: "rec-009",
    user: { id: "user-mira", name: "Mira Okafor", initials: "MO" },
    weekSlot: 2,
    totalSlots: 5,
    category: "Book",
    title: "The Years",
    subtitle: "Annie Ernaux, 2008",
    note: "A generational memoir written in the collective third person. Formally interesting and emotionally precise. One of the better Nobel picks in recent memory.",
    likes: 41,
    liked: true,
    saved: true,
    postedAt: "1 day ago",
    link: "https://www.goodreads.com/book/show/41571737",
  },
  {
    id: "rec-010",
    user: { id: "user-james", name: "James Kimani", initials: "JK" },
    weekSlot: 1,
    totalSlots: 4,
    category: "Film",
    title: "Aftersun",
    subtitle: "Charlotte Wells, 2022",
    note: "A film about a holiday that is actually about memory and loss. Quiet and technically accomplished. The ending earns everything that precedes it.",
    likes: 55,
    liked: false,
    saved: false,
    postedAt: "1 day ago",
    link: "https://www.imdb.com/title/tt14079374/",
  },
  {
    id: "rec-011",
    user: { id: "user-sol", name: "Sol Bernstein", initials: "SB" },
    weekSlot: 2,
    totalSlots: 3,
    category: "Article",
    title: "Against Productivity",
    subtitle: "n+1 Magazine, 2025",
    note: "Argues that productivity as a value system has industrial-era origins we have mostly forgotten. Polemical but not sloppy. Read on a weekend.",
    likes: 30,
    liked: false,
    saved: true,
    postedAt: "1 day ago",
    link: null,
  },
  {
    id: "rec-012",
    user: { id: "user-priya", name: "Priya Nair", initials: "PN" },
    weekSlot: 1,
    totalSlots: 5,
    category: "Place",
    title: "Tate Modern Turbine Hall",
    subtitle: "London, UK",
    note: "Current installation uses suspended mirrors that respond to movement. More interesting than it sounds in description. Free entry, closes in six weeks.",
    likes: 17,
    liked: false,
    saved: false,
    postedAt: "2 days ago",
    link: "https://www.tate.org.uk/visit/tate-modern",
  },
];

export default function RecommendationFeed() {
  const [recs, setRecs] = useState(RECOMMENDATIONS);

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

  return (
    <Stack gap={4}>
      {recs.map((rec) => (
        <RecommendationCard
          key={rec.id}
          rec={rec}
          onLike={() => handleLike(rec.id)}
          onSave={() => handleSave(rec.id)}
        />
      ))}
    </Stack>
  );
}
