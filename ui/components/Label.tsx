"use client";

/* Third-party components. */
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";

/* Project components. */
import { cn } from "@/ui/utils/cn";
import { Skeleton } from "@/ui/components/Skeleton";

/**
 * Label variants for different styles.
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

/**
 * Label component with variant support and loading state.
 */
const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & {
      /**
       * Whether to show a loading skeleton instead of the label.
       */
      loading?: boolean;
    }
>(({ className, loading, ...props }, ref) => {
  if (loading) return <Skeleton className="w-full h-5 mb-1 max-w-64" />;

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
