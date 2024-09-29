import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  secondary?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>( // comment: primary 색깔을 globals.css 에서 임의로 설정하세요.
  (
    { children, className, secondary, type = "button", disabled, ...props },
    ref
  ) => (
    <button
      type={type}
      className={twMerge(
        `font-bold px-6 py-2 border-2 rounded-xl ${
          !secondary
            ? "bg-[--primary] text-white border-white"
            : "bg-white text-[--primary] border-[--primary]"
        }`,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
