import classNames from "classnames";
import React, { useEffect, useState, forwardRef, ForwardedRef } from "react";

interface ToggleProp
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheck?: (e: boolean) => any;
  checked: boolean;
  disabled?: boolean;
}

const Switch = forwardRef(
  (
    { onCheck, checked, disabled = false, ...rest }: ToggleProp,
    ref: ForwardedRef<HTMLDivElement>
  ) => {

    return (
      <div
        className="relative flex flex-col items-center justify-center"
        ref={ref}
      >
        <div className="flex">
          <label className={classNames("inline-flex relative items-center mr-5 h-[25px]", {
            "pointer-events-none": disabled
          })}>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={checked}
              {...rest}
            />
            <div
              className="w-10 h-4 cursor-pointer bg-[#f89797] rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0.5px] after:left-[-4px] after:bg-[#fc0606] after:peer-checked:bg-[#44a0d3] after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#b1d4e7]"
            ></div>
          </label>
        </div>
      </div>
    );
  }
);

export default Switch;