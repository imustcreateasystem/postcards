import { Stack } from "../components/Container";
import FeedContent from "./components/content/FeedContent";
import FeedTopBar from "./components/top-bar/FeedTopBar";

export default function FeedScreen() {
  return (
    <Stack className="min-h-screen relative">
      <FeedTopBar />
      <FeedContent />
    </Stack>
  );
}
