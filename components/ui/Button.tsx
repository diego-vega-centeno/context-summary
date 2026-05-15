import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center hover:cursor-pointer rounded-md",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-muted-foreground hover:text-background",
        ghost: "bg-none hover:bg-highlight",
        withIcon: "justify-start gap-2 bg-none hover:bg-highlight",
      },
      size: {
        default: "h-8 px-2",
        lg: "h-10 px-4 py-2",
        md: "h-8 px-4 py-2",
      },
      disabled: {
        false: null,
        true: "opacity-50",
      },
      border: {
        true: "border-1 border-border",
        false: null,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ComponentType<{ className?: string }>;
    href?: string;
  };

export default function Button({
  variant,
  size,
  className,
  border,
  disabled,
  icon: Icon,
  href,
  ...props
}: ButtonProps) {
  const _className = cn(
    buttonVariants({
      variant,
      size,
      border,
      disabled,
    }),
    className,
  );

  if (href) {
    return (
      <Link href={href} className={_className}>
        {Icon && <Icon className="h-5 w-5" />}
        {props.children}
      </Link>
    );
  }

  return (
    <button className={_className} {...props}>
      {Icon && <Icon className="h-5 w-5" />}
      {props.children}
    </button>
  );
}
