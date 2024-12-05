import clsx from "clsx"
import { useRef } from "react"
import { useClickAway, useToggle } from "react-use"

const positions = {
  right: "right-0",
  left: "left-0",
}

interface DropDownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  position?: keyof typeof positions
}

export const DropDown = ({ trigger, children, position = 'right' }: DropDownProps): JSX.Element => {
  const [on, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle()
  })

  return (
    <div className="relative">
      <div onClick={toggle} className="inline-block">
        {trigger}
      </div>
      {on && (
        <ul
          ref={ref}
          className={clsx(
            "w-max z-10 absolute top-6 bg-white rounded-sm shadow inline-block py-2 text-default text-primary-200 visible opacity-100",
            positions[position]
          )}
        >
          {children}
        </ul>
      )}
    </div>
  )
}
