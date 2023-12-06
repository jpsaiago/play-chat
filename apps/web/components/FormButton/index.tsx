import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  mini?: boolean;
}

export function FormButton({ label, mini, ...props }: Props) {
  return (
    <button
      className={`bg-indigo-400 hover:bg-indigo-300 rounded-md py-2 ${
        mini ? "px-6" : "px-10"
      } text-white font-600 transition-colors`}
      {...props}
    >
      {label}
    </button>
  );
}
