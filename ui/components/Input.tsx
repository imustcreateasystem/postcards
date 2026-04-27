"use client";

import { ComponentProps, forwardRef, useCallback, useState } from "react";
import { Clock, EyeIcon, EyeOffIcon, Search } from "lucide-react";
import { Queue } from "@/ui/components/Container";
import { Skeleton } from "@/ui/components/Skeleton";
import { cn } from "@/ui/utils/cn";

const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & {
    loading?: boolean;
    grow?: boolean;
    noMargin?: boolean;
    inline?: boolean;
    small?: boolean;
  }
>(
  (
    {
      className,
      type,
      loading,
      grow,
      noMargin = true,
      small = false,
      inline,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleIsPasswordVisible = useCallback(
      () => setIsPasswordVisible(!isPasswordVisible),
      [isPasswordVisible],
    );

    if (loading)
      return (
        <Skeleton className="relative flex items-center mb-1 h-9 bg-stone-100 rounded" />
      );

    return (
      <Queue
        itemsCenter
        className={cn(
          "relative items-center h-9",
          !noMargin && "mb-1",
          grow && "grow",
          inline && "inline-flex",
        )}
      >
        <input
          role="textbox"
          type={isPasswordVisible ? "text" : type}
          className={cn(
            /* Wireframe base. */
            "relative flex w-full h-full rounded px-3 py-1",
            "bg-stone-50 border border-stone-300 text-sm text-stone-700",
            "placeholder:text-stone-400",
            "hover:border-stone-400",
            "focus-visible:outline-none focus-visible:border-stone-500 focus-visible:ring-1 focus-visible:ring-stone-300",
            "disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400 disabled:border-stone-200",

            /* Type-specific padding. */
            type === "password" && "ps-4 pe-10",
            type === "search" && "ps-10 pe-4",
            type === "time" && "ps-4 pe-8",

            /* Size. */
            small && "text-sm h-8 px-2",
            className,
          )}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 inset-e-0 z-20 flex items-center px-3 text-stone-400 hover:text-stone-600 focus:outline-none"
            onClick={toggleIsPasswordVisible}
          >
            {isPasswordVisible ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
          </button>
        )}

        {type === "search" && (
          <button
            className="absolute inset-y-0 left-0 flex items-center px-3 text-stone-400"
            type="button"
          >
            <Search className="size-4" />
          </button>
        )}

        {type === "time" && (
          <Queue
            itemsCenter
            className="absolute inset-y-0 right-0 px-3 pointer-events-none text-stone-400"
          >
            <Clock className="size-4" />
          </Queue>
        )}
      </Queue>
    );
  },
);
Input.displayName = "Input";

export { Input };
