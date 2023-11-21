import clsx from "clsx"

interface NavItemProps {
  children: React.ReactNode
  isActive?: boolean
  isEditing?: boolean
  dropDown?: JSX.Element
}

export const NavItem = ({
  children,
  isActive = false,
  isEditing = false,
  dropDown
}: NavItemProps): JSX.Element => {
  return (
    <li
      className={clsx(
        "h-8 hover:bg-primary-20 relative group list-none",
        (isActive || isEditing) && "bg-primary-20"
      )}
    >
      {children}
      {dropDown !== undefined && (
        <div className="absolute w-max inset-y-0 right-2 top-1 h-6 opacity-0 invisible group-hover:visible opacity-100">
          {dropDown}
        </div>
      )}
      {isEditing && (
        <div className="ml-8 box-border border-b border-primary-200"></div>
      )}
    </li>
  )
}
