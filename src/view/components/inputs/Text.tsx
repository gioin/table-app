import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

interface TextProps {
  label?: string;
}

const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & TextProps
>(({ label, id, ...rest }, ref) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-md font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        className={classNames(
          "border bg-transparent border-t-0 border-x-0 border-b-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 outline-none",
          {},
          rest.className
        )}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default TextInput;
