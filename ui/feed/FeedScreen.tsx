import { Stack } from "../components/Container";
import FeedContent from "./components/FeedContent";
import FeedTopBar from "./components/FeedTopBar";

export default function FeedScreen() {
  return (
    <Stack className="min-h-screen relative">
      <FeedTopBar />
      <FeedContent />
    </Stack>
  );
}
