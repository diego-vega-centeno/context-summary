export default function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={`inline-flex items-center justify-center p-2 bg-background text-foreground hover:bg-foreground hover:text-background hover:cursor-pointer rounded-md ${className}`}
      {...props}
    />
  );
}
