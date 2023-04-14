import classNames from "classnames";
import React from "react";

interface Props {
  children?: React.ReactNode | string | React.ReactNode[];
  variant: "circle" | "plain";
  onClick?: React.MouseEventHandler | undefined;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & Props
>(function Button({ variant, children, ...rest }, ref) {
  return (
    <button
      {...rest}
      ref={ref}
      className={classNames(
        "hover:opacity-80 text-white font-thin focus:outline-none focus:shadow-outline",
        {
          "rounded-[30px] w-[142px] h-[40px]": variant === "plain",
          "rounded-full h-[65px] w-[65px] text-[30px]": variant === "circle",
          "cursor-not-allowed opacity-40 hover:!opacity-40 relative":
            rest.disabled
        },
        rest.className
      )}
    >
      {variant === "circle" && (
        <div className="absolute left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2">
          +
        </div>
      )}
      {children}
    </button>
  );
});
