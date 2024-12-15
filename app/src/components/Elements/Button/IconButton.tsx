import clsx from "clsx"
import * as React from "react"
import { Icon } from "../Icon"
import { Spinner } from "flowbite-react"

const variants = {
  default: "hover:bg-primary-20",
  active: "bg-primary-40 hover:bg-primary-50",
  disabled: "bg-natural-30"
}

const sizes = {
  default: "py-2 px-2"
}

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: string
  disabled?: boolean
  className?: string
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  icon: React.ReactElement
  isLoading?: boolean
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type = "button",
      disabled = false,
      className = "",
      variant = "default",
      size = "default",
      icon,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(
          "flex justify-center items-center rounded-full",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="mx-1"/>}
        {!isLoading && icon}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"
