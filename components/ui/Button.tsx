import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";

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

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ComponentType<object>;
    href?: string;
  };

export default function Button({
  variant,
  size,
  className,
  icon: Icon,
  href,
  ...props
}: ButtonProps) {
  const _className = buttonVariants({ variant, size, className });

  if (href) {
    return (
      <Link href={href} className={_className}>
        {Icon && <Icon />}
        {props.children}
      </Link>
    );
  }

  return (
    <button className={_className} {...props}>
      {Icon && <Icon />}
      {props.children}
    </button>
  );
}
