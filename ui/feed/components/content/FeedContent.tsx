import { Queue, Stack } from "@/ui/components/Container";
import FeedFilters from "./filters/FeedFilters";
import RecommendationFeed from "./recommendation-feed/RecommendationFeed";
import WeeklyPostButton from "./weekly-post-button/WeeklyPostButton";

function SuggestedCurators() {
  return <div>SuggestedCurators</div>;
}

function MainColumn() {
  return (
    <Stack gap={0} className="flex-1 min-w-0">
      <FeedFilters />
      <RecommendationFeed />
    </Stack>
  );
}

function Sidebar() {
  return (
    <Stack as="aside" gap={6} className="hidden lg:flex w-72 xl:w-80 shrink-0">
      <WeeklyPostButton />
      <SuggestedCurators />
    </Stack>
  );
}

export default function FeedContent() {
  return (
    <Queue
      as="main"
      gap={8}
      className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8 xl:px-10 2xl:px-16"
    >
      <MainColumn />
      <Sidebar />
    </Queue>
  );
}
