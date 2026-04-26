/* Third-party imports. */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging and conditionally applying
 * Tailwind CSS classes.
 *
 * @param inputs Union of class names to merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
