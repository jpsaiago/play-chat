import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function FormButton({ label, ...props }: Props) {
  return (
    <button
      className="bg-rose-500 hover:bg-rose-400 rounded-md py-2 px-10 text-white font-600 transition-colors"
      {...props}
    >
      {label}
    </button>
  );
}
