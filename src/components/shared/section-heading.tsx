import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col gap-3 max-w-2xl", alignmentClasses[align], className)}>
      {eyebrow && (
        <span className="font-label-sm text-xs md:text-sm text-warm-gray tracking-widest uppercase bg-surface-container-low px-3.5 py-1 rounded-full border border-light-taupe/40 w-fit">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight font-medium tracking-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-body-md text-warm-gray text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
