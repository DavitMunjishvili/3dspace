import { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import CirclingLoader from "../Loaders/Circling";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  iconButton?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "light" | "subtle" | "text";
  color?: "brand" | "blue" | "green" | "red";
}

export default function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  iconButton = false,
  loading = false,
  variant = "filled",
  color = "brand",
  ...props
}: ButtonProps) {
  let styleClasses =
    "cursor-pointer font-normal flex items-center gap-2 rounded-md duration-150 disabled:cursor-not-allowed disabled:bg-gray-400";

  if (iconButton) styleClasses += " p-0.5";
  else styleClasses += " py-2 px-4";

  if (fullWidth) styleClasses += " w-full justify-center";

  if (variant === "outlined") {
    styleClasses += " border shadow-md";
    if (color === "brand")
      styleClasses += " border-indigo-500 text-indigo-800 hover:bg-indigo-200";
    else if (color === "blue")
      styleClasses += " border-blue-500 text-blue-800 hover:bg-blue-200";
    else if (color === "green")
      styleClasses += " border-green-500 text-green-800 hover:bg-green-200";
    else if (color === "red")
      styleClasses += " border-red-500 text-red-800 hover:bg-red-200";
  } else if (variant === "filled") {
    styleClasses += " shadow-md";
    if (color === "brand")
      styleClasses += " bg-indigo-500 text-indigo-50 hover:bg-indigo-600";
    else if (color === "blue")
      styleClasses += " bg-blue-500 text-blue-50 hover:bg-blue-600";
    else if (color === "green")
      styleClasses += " bg-green-500 text-green-50 hover:bg-green-600";
    else if (color === "red")
      styleClasses += " bg-red-500 text-red-50 hover:bg-red-600";
  } else if (variant === "subtle") {
    if (color === "brand")
      styleClasses += " text-indigo-800 hover:bg-indigo-100";
    else if (color === "blue")
      styleClasses += " text-blue-800 hover:bg-blue-100";
    else if (color === "green")
      styleClasses += " text-green-800 hover:bg-green-100";
    else if (color === "red") styleClasses += " text-red-800 hover:bg-red-100";
  } else if (variant === "light") {
    styleClasses += " shadow-md";
    if (color === "brand")
      styleClasses += " bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
    else if (color === "blue")
      styleClasses += " bg-blue-100 text-blue-800 hover:bg-blue-200";
    else if (color === "green")
      styleClasses += " bg-green-100 text-green-800 hover:bg-green-200";
    else if (color === "red")
      styleClasses += " bg-red-100 text-red-800 hover:bg-red-200";
  } else if (variant === "text") {
    if (color === "brand") styleClasses += " text-indigo-800";
    else if (color === "blue") styleClasses += " text-blue-800";
    else if (color === "green") styleClasses += " text-green-800";
    else if (color === "red") styleClasses += " text-red-800";
  }

  return (
    <button
      className={twMerge(styleClasses, className)}
      {...props}
      disabled={disabled || loading}
    >
      {loading && <CirclingLoader small />}
      {children}
    </button>
  );
}
