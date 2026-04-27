import { getRecommendations } from "@/db/recommendations";
import { getUserWeek } from "@/db/user";
import { Stack } from "../components/Container";
import FeedContent from "./components/content/FeedContent";
import FeedTopBar from "./components/top-bar/FeedTopBar";

export default async function FeedScreen() {
  const [recommendations, userWeek] = await Promise.all([
    getRecommendations(),
    getUserWeek(),
  ]);

  return (
    <Stack className="min-h-screen relative">
      <FeedTopBar />
      <FeedContent initialRecs={recommendations} initialUserWeek={userWeek} />
    </Stack>
  );
}
