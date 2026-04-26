/* Third-party imports. */
import { forwardRef, ElementType, ReactNode, HTMLAttributes } from "react";

/* Project components. */
import { cn } from "@/ui/utils/cn";

/**
 * The props for the FlexContainer component.
 */
type FlexContainerProps = {
  /**
   * The component to render as: `<div>`, `<section>`, &c.
   */
  as?: ElementType;

  /**
   * Whether you want to center the contents.
   * Centers both vertically and horizontally.
   */
  center?: boolean;

  /**
   * Additional class names you wish to apply to
   * the container.
   */
  className?: string;

  /**
   * Direction of the flex flow.
   */
  direction?: "row" | "col";

  /**
   * The flex gap between items.
   */
  gap?:
    | 0
    | 0.5
    | 1
    | 1.5
    | 2
    | 3
    | 4
    | 5
    | 6
    | 8
    | 10
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64;

  /**
   * Whether you want to apply align-items: center to the flex container.
   */
  itemsCenter?: boolean;

  /**
   * Whether you want to apply align-items: end to the flex container.
   */
  itemsEnd?: boolean;

  /**
   * Whether you want to apply align-items: stretch to the flex container.
   */
  itemsStretch?: boolean;

  /**
   * Whether you want to apply align-items: baseline to the flex container.
   */
  itemsBaseline?: boolean;

  /**
   * Whether you want to apply align-items: start to the flex container.
   */
  itemsStart?: boolean;

  /**
   * Whether you want to apply justify-around to the flex container.
   */
  justifyAround?: boolean;

  /**
   * Whether you want to apply justify-between to the flex container.
   */
  justifyBetween?: boolean | null;

  /**
   * Whether you want to apply justify-center to the flex container.
   */
  justifyCenter?: boolean;

  /**
   * Whether you want to apply justify-evenly to the flex container.
   */
  justifyEnd?: boolean;

  /**
   * Whether you want to apply justify-center to the flex container.
   */
  justifyEvenly?: boolean;

  /**
   * Whether you want to apply justify-start to the flex container.
   */
  justifyStart?: boolean;

  /**
   * Whether you want to apply flex-wrap to the flex container.
   */
  wrap?: boolean;

  /**
   * Whether you want to apply w-full to the flex container.
   */
  fullWidth?: boolean;

  /**
   * Whether you want to apply h-full to the flex container.
   */
  fullHeight?: boolean;

  /**
   * The children to render.
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

/**
 * Wrapper around a flex container.
 * @param as The component to render as: `<div>`, `<section>`, &c. A `div` by default.
 * @param center Whether you want to center the contents.
 * Centers both vertically and horizontally.
 * @param className Additional class names.
 * @param direction Direction of the flex flow.
 * @param gap The flex gap between items.
 * @param itemsCenter Whether you want to apply align-items: center to the flex container.
 * @param itemsEnd Whether you want to apply align-items: end to the flex container.
 * @param itemsStart Whether you want to apply align-items: start to the flex container.
 * @param itemsStretch Whether you want to apply align-items: stretch to the flex container.
 * @param itemsBaseline Whether you want to apply align-items: baseline to the flex container.
 * @param justifyAround Whether you want to apply justify-around to the flex container.
 * @param justifyBetween Whether you want to apply justify-between to the flex container.
 * @param justifyCenter Whether you want to apply justify-center to the flex container.
 * @param justifyEnd Whether you want to apply justify-end to the flex container.
 * @param justifyEvenly Whether you want to apply justify-evenly to the flex container.
 * @param justifyStart Whether you want to apply justify-start to the flex container.
 * @param wrap Whether you want to apply flex-wrap to the flex container.
 * @param fullWidth Whether you want to apply w-full to the flex container.
 * @param fullHeight Whether you want to apply h-full to the flex container.
 * @param children The children to render.
 * @param props Additional HTML element attributes (see `HTMLElement`).
 */
const FlexContainer = forwardRef<HTMLElement, FlexContainerProps>(
  (
    {
      as: Component = "div",
      center = false,
      children,
      className,
      direction = "row",
      gap = 0,
      itemsCenter = false,
      itemsEnd = false,
      itemsStretch = false,
      itemsStart = false,
      itemsBaseline = false,
      justifyAround = false,
      justifyBetween = false,
      justifyCenter = false,
      justifyEnd = false,
      justifyEvenly = false,
      justifyStart = false,
      wrap = false,
      fullWidth = false,
      fullHeight = false,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "flex",
          direction === "row" ? "flex-row" : "flex-col",
          {
            "gap-0": gap === 0,
            "gap-0.5": gap === 0.5,
            "gap-1": gap === 1,
            "gap-1.5": gap === 1.5,
            "gap-2": gap === 2,
            "gap-3": gap === 3,
            "gap-4": gap === 4,
            "gap-5": gap === 5,
            "gap-6": gap === 6,
            "gap-8": gap === 8,
            "gap-10": gap === 10,
            "gap-12": gap === 12,
            "gap-16": gap === 16,
            "gap-20": gap === 20,
            "gap-24": gap === 24,
            "gap-32": gap === 32,
            "gap-40": gap === 40,
            "gap-48": gap === 48,
            "gap-56": gap === 56,
            "gap-64": gap === 64,
          },
          center && "items-center justify-center",
          itemsCenter && "items-center",
          itemsStart && "items-start",
          itemsEnd && "items-end",
          itemsStretch && "items-stretch",
          itemsBaseline && "items-baseline",
          justifyAround && "justify-around",
          justifyBetween && "justify-between",
          justifyCenter && "justify-center",
          justifyStart && "justify-start",
          justifyEnd && "justify-end",
          justifyEvenly && "justify-evenly",
          wrap && "flex-wrap",
          fullWidth && "w-full",
          fullHeight && "h-full",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
FlexContainer.displayName = "FlexContainer";

/**
 * A Queue component arranges its children in a row.
 * @param className Additional class names to be applied to the container.
 * @param props Additional HTML element attributes (see `HTMLElement`).
 */
const Queue = forwardRef<HTMLElement, Omit<FlexContainerProps, "direction">>(
  ({ className, ...props }, ref) => {
    return (
      <FlexContainer
        {...props}
        ref={ref}
        direction="row"
        className={className}
      />
    );
  },
);
Queue.displayName = "Queue";

/**
 * A Stack component arranges its children in a column.
 * @param className Additional class names to be applied to the container.
 * @param props Additional HTML element attributes (see `HTMLElement`).
 */
const Stack = forwardRef<HTMLElement, Omit<FlexContainerProps, "direction">>(
  ({ className, ...props }, ref) => {
    return (
      <FlexContainer
        {...props}
        ref={ref}
        direction="col"
        className={className}
      />
    );
  },
);
Stack.displayName = "Stack";

export { FlexContainer, type FlexContainerProps, Queue, Stack };
