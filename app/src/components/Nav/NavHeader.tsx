interface NavHeaderProps {
  title: string
  children?: JSX.Element
}

export const NavHeader = ({ title, children }: NavHeaderProps): JSX.Element => {
  return (
    <div className="flex items-center py-1 px-2 text-h100 text-natural-300">
      <div>{title}</div>
      <div className="ml-auto">{children}</div>
    </div>
  )
}
