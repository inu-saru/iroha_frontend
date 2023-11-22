interface DropDownItemProps {
  label: string
  handleClick?: () => void
}

export const DropDownItem = ({
  label,
  handleClick
}: DropDownItemProps): JSX.Element => {
  return (
    <li
      className="px-4 py-2 w-full hover:bg-primary-20"
      onClick={() => {
        handleClick?.()
      }}
    >
      {label}
    </li>
  )
}
