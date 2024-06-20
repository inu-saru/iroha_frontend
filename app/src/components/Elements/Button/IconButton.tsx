import clsx from "clsx"
import * as React from "react"
import { Icon } from "../Icon"

const variants = {
  default: "hover:bg-primary-30",
  active: "bg-error-30 hover:bg-error-40",
  disabled: ""
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
        {icon}
        { variant === 'disabled' && <Icon variant='disabled' className='-ml-6' />}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"
