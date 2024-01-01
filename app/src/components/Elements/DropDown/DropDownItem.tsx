import clsx from "clsx"
import { Radio } from "../Radio"

interface DropDownItemProps {
  icon: React.ReactElement
  radioName?: string
  radioChecked?: boolean
  label: string
  handleClick?: () => void
}

export const DropDownItem = ({
  icon,
  radioName,
  radioChecked = false,
  label,
  handleClick
}: DropDownItemProps): JSX.Element => {
  return (
    <li className="list-none">
      <label
        className="flex items-center block px-4 py-2 w-full hover:bg-primary-20"
        onClick={() => {
          handleClick?.()
        }}
      >
        <span className={clsx(radioName != null && "mr-2")}>
          {radioName != null && (
            <Radio name={radioName} checked={radioChecked} />
          )}
        </span>
        <span className={clsx(icon != null && "mr-1")}>{icon}</span>
        {label}
      </label>
    </li>
  )
}
