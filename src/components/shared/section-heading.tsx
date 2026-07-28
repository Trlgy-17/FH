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
    <div className={cn("flex flex-col gap-3.5 max-w-3xl", alignmentClasses[align], className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium text-warm-gray bg-black/5 dark:bg-white/5 border border-foreground/10 w-fit backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-serif text-3xl md:text-5xl lg:text-6xl text-primary leading-[1.1] font-medium tracking-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-base md:text-lg text-warm-gray leading-relaxed max-w-[65ch]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
