import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// comment: primary 색깔을 globals.css 에서 임의로 설정하세요.

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      className={twMerge(
        `w-full p-3 rounded-lg bg-neutral-900 text-white font-bold border border-neutral-500 focus:outline-none disabled:bg-neutral-900/70 disabled:text-neutral-500 disabled:cursor-not-allowed`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = "Input";

export default Input;
