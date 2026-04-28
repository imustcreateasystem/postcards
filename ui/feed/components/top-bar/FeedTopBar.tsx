"use client";

import { useState } from "react";
import { Bell, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Queue } from "@/ui/components/Container";
import { Button } from "@/ui/components/Button";
import { APP_NAME } from "@/lib/constants/brand";
import { signOut, useSession } from "@/lib/auth/client";

const WEEKS = [
  { id: "week-apr21", label: "Week of Apr 21", short: "Apr 21" },
  { id: "week-apr14", label: "Week of Apr 14", short: "Apr 14" },
  { id: "week-apr7", label: "Week of Apr 7", short: "Apr 7" },
  { id: "week-mar31", label: "Week of Mar 31", short: "Mar 31" },
];

function TopbarLogo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <span className="hidden sm:block text-base font-semibold tracking-tight text-stone-800">
        {APP_NAME}
      </span>
    </Link>
  );
}

function WeekNavigator({
  weekIndex,
  onChange,
}: {
  weekIndex: number;
  onChange: (i: number) => void;
}) {
  return (
    <Queue itemsCenter gap={2}>
      <Button
        variant="ghost"
        size="iconSmall"
        onClick={() => onChange(Math.min(weekIndex + 1, WEEKS.length - 1))}
        disabled={weekIndex === WEEKS.length - 1}
        aria-label="Previous week"
      >
        <ChevronLeft />
      </Button>
      <Queue itemsCenter gap={3} className="px-3 py-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
        <span className="text-sm font-medium text-stone-700 whitespace-nowrap">
          <span className="hidden sm:inline">{WEEKS[weekIndex].label}</span>
          <span className="sm:hidden">{WEEKS[weekIndex].short}</span>
        </span>
      </Queue>
      <Button
        variant="ghost"
        size="iconSmall"
        onClick={() => onChange(Math.max(weekIndex - 1, 0))}
        disabled={weekIndex === 0}
        aria-label="Next week"
      >
        <ChevronRight />
      </Button>
    </Queue>
  );
}

function TopbarActions() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => router.push("/auth"),
      },
    });
    setIsSigningOut(false);
  };

  return (
    <Queue itemsCenter gap={3} className="shrink-0">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search />
      </Button>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications — 3 unread"
        >
          <Bell />
        </Button>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-stone-400 pointer-events-none" />
      </div>

      {isPending ? (
        <div className="size-8 shrink-0 rounded-full bg-stone-200 animate-pulse" />
      ) : (
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          aria-label="Sign out"
          className="size-8 shrink-0 rounded-full bg-stone-200 text-xs font-semibold text-stone-700
            flex items-center justify-center
            hover:bg-stone-300 hover:text-stone-800
            disabled:cursor-not-allowed disabled:opacity-50
            transition-colors"
        >
          {isSigningOut ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            initials
          )}
        </button>
      )}
    </Queue>
  );
}

export default function FeedTopbar() {
  const [weekIndex, setWeekIndex] = useState(0);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/60 backdrop-blur-sm">
      <Queue
        as="div"
        itemsCenter
        justifyBetween
        gap={4}
        className="mx-auto max-w-screen-2xl h-14 px-4 sm:px-6 lg:px-8 xl:px-10"
      >
        <TopbarLogo />
        <WeekNavigator weekIndex={weekIndex} onChange={setWeekIndex} />
        <TopbarActions />
      </Queue>
    </header>
  );
}
