import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { label: string; value: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="font-sans text-xs font-semibold text-primary uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            "flex h-12 w-full rounded-md border border-light-taupe bg-soft-white px-4 py-2 text-sm text-primary transition-colors focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-no-repeat bg-[right_1rem_center]",
            error && "border-destructive focus:border-destructive focus:ring-destructive",
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%256F6A63' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundSize: "1.25em 1.25em",
          }}
          ref={ref}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="font-sans text-xs text-destructive">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
