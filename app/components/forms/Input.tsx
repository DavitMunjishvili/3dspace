import { twMerge } from "tailwind-merge";

interface GeneralProps {
  className?: string;
  name?: string;
}

interface NumberInputProps extends GeneralProps {
  type: "number";
  value: number;
  onChange: (value: number) => void;
}

interface TextInputProps extends GeneralProps {
  type: "text";
  value: string;
  onChange: (value: string) => void;
}

type InputProps = NumberInputProps | TextInputProps;

export default function Input({
  type,
  value,
  className,
  name,
  onChange,
}: InputProps) {
  function handleChange(value: string) {
    if (type === "number") {
      onChange(parseInt(value) || 0);
    } else if (type === "text") {
      onChange(value);
    }
  }

  return (
    <input
      name={name}
      className={twMerge(
        "rounded-lg border border-indigo-900 bg-white px-2 py-1 focus:border-indigo-600 focus:ring-indigo-600",
        className
      )}
      type={type}
      value={value}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
}
