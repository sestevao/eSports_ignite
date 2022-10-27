import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input(props: InputProps) {
  return (
    <input
      {...props}

      className="bg-zinc-900 text-zinc-500 placeholder:text-zinc-500 rounded py-4 px-4 text-sm"
    />
  )
}