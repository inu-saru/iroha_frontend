import * as React from "react"
import clsx from "clsx"

const sizes = {
  default: "p-8",
  middle: "p-4"
}

const variants = {
  default: "rounded bg-white border border-solid border-natural-50"
}

interface BaseProps {
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  className?: string
  children: React.ReactNode
}

export const Base = ({
  size = "default",
  variant = "default",
  className = "",
  children
}: BaseProps): JSX.Element => {
  return (
    <>
      <div className={clsx(sizes[size], variants[variant], className)}>
        {children}
      </div>
    </>
  )
}
