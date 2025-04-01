import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "w-full px-3 pt-2 pb-2.5 rounded-lg font-base border h-10 focus:outline-none transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-graphite/20 focus:border-graphite/40",
        error: "border-rose focus:border-rose",
      },
      disabled: {
        true: "bg-graphite/0 text-graphite/20 cursor-not-allowed",
        false: "bg-transparent",
      },
      hasMailSuffix: {
        true: "pr-[88px]",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  },
);

type InputProps = VariantProps<typeof inputVariants> & {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
  errorText?: string;
  label?: string;
  disabled?: boolean | undefined;
};

export const Input = ({
  variant,
  onChange,
  placeholder,
  value,
  disabled,
  errorText,
  label,
}: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm leading-5 text-graphite/60">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          className={inputVariants({
            variant,
            disabled,
            className: "disabled:opacity-50",
          })}
        />
      </div>
      {variant === "error" && errorText && (
        <p className="text-xs leading-4 text-rose">{errorText}</p>
      )}
    </div>
  );
};
