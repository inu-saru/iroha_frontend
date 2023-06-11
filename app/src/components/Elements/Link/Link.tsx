import clsx from "clsx"
import { Link as RouterLink, type LinkProps } from "react-router-dom"

import { WEB_URL } from "@/config"

const targetURL = (to: string): string => {
  return `${WEB_URL}${to}`
}

export const Link = ({
  className,
  children,
  to,
  ...props
}: LinkProps): JSX.Element => {
  return (
    <RouterLink
      className={clsx("text-indigo-600 hover:text-indigo-900", className)}
      to={targetURL(to)}
      {...props}
    >
      {children}
    </RouterLink>
  )
}
