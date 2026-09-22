export const Button = ({
  className = "",
  size = "default",
  as: Component = "button",
  children,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-transform duration-150 shadow-lg shadow-primary/25 cursor-pointer";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  return (
    <Component className={classes} {...props}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};
