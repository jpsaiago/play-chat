import {
  InputHTMLAttributes,
  PropsWithChildren,
  forwardRef,
  useState,
} from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithChildren {
  label?: string;
  isPassword?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  function InnerInput({ label, isPassword = false, children, ...props }, ref) {
    const [hidePassword, setHidPassword] = useState(isPassword);
    return (
      <label className="flex flex-col w-full text-slate-700">
        {label}
        <div
          className={`flex-row flex items-center border border-stone-300 bg-white rounded-md p-2 font-poppins ${
            label && "mt-3"
          } focus-within:(ring ring-2 ring-violet-400)`}
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
              } text-2xl ml-2 hover:cursor-pointer bg-slate-500 focus:bg-violet-400 hover:bg-violet-400 transition-colors`}
            />
          )}
        </div>
        {children}
      </label>
    );
  }
);
