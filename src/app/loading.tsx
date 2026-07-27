export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-background">
      <div className="w-10 h-10 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      <span className="font-serif text-lg text-primary font-medium tracking-tight animate-pulse">
        FULLHOME ID
      </span>
    </div>
  );
}
