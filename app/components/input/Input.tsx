import React, { forwardRef } from "react";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, value, type, onChange, ...rest }, ref) => {
    return (
      <div className="relative w-full">
        <label
          className="absolute -top-2  left-4 bg-[#f5f4ef] z-40 px-1 text-xs text-slate-600"
          htmlFor="generic-input"
        >
          {label}
        </label>
        <input
          ref={ref}
          id="generic-input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          {...rest}
          className=" z-50 w-full border border-black rounded-lg bg-[#f5f4ef] placeholder:text-gray-400 px-4 py-3 focus:outline-none focus:ring-1 focus:border-none focus:ring-green-500"
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
