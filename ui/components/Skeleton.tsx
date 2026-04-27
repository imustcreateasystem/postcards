/* Third-party components. */
import { HTMLAttributes } from "react";

/* Project components. */
import { cn } from "@/ui/utils/cn";

/**
 * Props for skeleton component.
 */
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional class names for the skeleton.
   */
  className?: string;
}

/**
 * Skeleton component to indicate loading state.
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-testid="skeleton"
      role="status"
      className={cn(
        "animate-pulse rounded-md bg-stone-500/10 dark:bg-stone-800",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
