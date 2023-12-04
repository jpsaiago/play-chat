import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  footer?: string;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  function InnerInput({ label, footer, ...props }, ref) {
    return (
      <label className="flex flex-col w-full h-10 text-slate-700">
        {label}
        <input
          ref={ref}
          className={`border border-stone-300 rounded-md p-2 font-poppins ${
            label && "mt-3"
          } focus:(outline-none ring ring-2 ring-rose-500)`}
          {...props}
        />
        {footer && (
          <p className="text-xs text-center mt-1 text-slate-500">{footer}</p>
        )}
      </label>
    );
  }
);
