import clsx from "clsx"
import * as React from "react"

const sizes = {
  default: "py-2 px-4 text-middle",
  small: "py-1 px-4 text-small"
}

export type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof sizes
  isActive?: boolean
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      type = "button",
      className = "",
      size = "default",
      isActive = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex justify-center items-center border border-natural-40 disabled:opacity-70 disabled:cursor-not-allowed rounded-full shadow-sm font-medium focus:outline-none hover:opacity-80",
          sizes[size],
          isActive ? "bg-primary-30" : "bg-white",
          className
        )}
        {...props}
      >
        <span>{props.children}</span>
      </button>
    )
  }
)
