import clsx from "clsx"
import { Link as RouterLink, type LinkProps } from "react-router-dom"

export const Link = ({
  className,
  children,
  to,
  ...props
}: LinkProps): JSX.Element => {
  return (
    <RouterLink
      className={clsx("text-indigo-600 hover:text-indigo-900", className)}
      to={to}
      {...props}
    >
      {children}
    </RouterLink>
  )
}
