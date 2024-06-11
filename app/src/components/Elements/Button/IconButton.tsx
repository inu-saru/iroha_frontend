import clsx from "clsx"
import * as React from "react"

const sizes = {
  default: "py-2 px-2"
}

interface IconProps { icon: React.ReactElement }

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof sizes
  isActive?: boolean
} & IconProps

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type = "button",
      className = "",
      size = "default",
      icon,
      isActive = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "flex justify-center items-center rounded-full hover:bg-primary-30",
          sizes[size],
          className
        )}
        {...props}
      >

        {!isActive && icon}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"
