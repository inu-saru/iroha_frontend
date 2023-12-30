import clsx from "clsx"
import * as React from "react"

import { Spinner } from "@/components/Elements/Spinner"

const variants = {
  primary: "bg-primary-300 text-natural-0",
  secondary: "bg-white text-natural-900",
  error: "bg-error-300 text-natural-0"
}

const sizes = {
  default: "py-2 px-4 text-middle",
  small: "py-1 px-2 text-small"
}

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  isLoading?: boolean
} & IconProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant = "primary",
      size = "default",
      isLoading = false,
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
          "flex justify-center items-center border border-natural-40 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" />}
        {!isLoading && startIcon}
        <span
          className={clsx(
            (isLoading || startIcon != null) && "ml-1",
            endIcon != null && "mr-1"
          )}
        >
          {props.children}
        </span>
        {!isLoading && endIcon}
      </button>
    )
  }
)

Button.displayName = "Button"
