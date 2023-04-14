import React, { useState, forwardRef, ForwardedRef } from "react";

type Option = {
  value: string | number;
  label: string;
};

type DropDownProps = {
  id: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: Option
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const DropDown = forwardRef(
  (
    { id, label, options, placeholder, value, defaultValue, ...rest }: DropDownProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className="relative">
        {label && (
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 absolute right-0 top-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>

        <select
          id={id}
          className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b text-[#a0a0a0] appearance-none outline-none focus:ring-0 border-b-gray-300 peer"
          ref={ref}
          value={value}
          {...rest}
        >
          {placeholder && (
            <option className="hidden" disabled selected>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <>
              <option className="text-black" key={option.value} value={option.value}>
                {option.label}
              </option>
            </>
          ))}
        </select>
      </div>
    );
  }
);
