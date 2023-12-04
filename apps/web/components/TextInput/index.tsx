import { InputHTMLAttributes, forwardRef, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  footer?: string;
  isPassword?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  function InnerInput({ label, footer, isPassword = false, ...props }, ref) {
    const [hidePassword, setHidPassword] = useState(isPassword);
    return (
      <label className="flex flex-col w-full h-10 text-slate-700">
        {label}
        <div
          className={`flex-row flex items-center border border-stone-300 rounded-md p-2 font-poppins ${
            label && "mt-3"
          } focus-within:(ring ring-2 ring-rose-500)`}
        >
          <input
            className="outline-none w-11/12"
            type={hidePassword ? "password" : "text"}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setHidPassword((s) => !s);
              }}
              className={` ${
                hidePassword ? "i-ph-eye" : "i-ph-eye-closed"
              } text-2xl ml-2 hover:cursor-pointer bg-slate-500 focus:bg-rose-500 hover:bg-rose-500 transition-colors`}
            />
          )}
        </div>
        {footer && (
          <p className="text-xs text-center mt-1 text-slate-500">{footer}</p>
        )}
      </label>
    );
  }
);
