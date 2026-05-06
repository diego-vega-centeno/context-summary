import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center hover:cursor-pointer rounded-md",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-muted-foreground hover:text-background",
        ghost: "bg-none hover:bg-highlight",
      },
      size: {
        default: "h-8 px-4 py-2",
        lg: "h-10 px-4 py-2",
      },
      disabled: {
        false: null,
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  },
);

export default function Button({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
