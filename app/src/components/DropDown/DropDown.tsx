import { useRef } from "react"
import { useClickAway, useToggle } from "react-use"

interface DropDownProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export const DropDown = ({ trigger, children }: DropDownProps): JSX.Element => {
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
          className="z-10 absolute left-0 top-6 bg-white rounded-sm shadow inline-block py-2 text-default text-primary-200 visible opacity-100"
        >
          {children}
        </ul>
      )}
    </div>
  )
}
