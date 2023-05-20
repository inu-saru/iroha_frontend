import React, { type ReactElement, useRef } from "react"
import { useClickAway, useToggle } from "react-use"

interface MethodsProps {
  isSwitched: boolean
  ref: any
  toggle: () => void
  dropDownWitoEditToggle: ReactElement
}

interface NavItemSwitchProps {
  dropDown: any
  children: (methods: MethodsProps) => React.ReactNode
}

export const NavItemSwitch = ({
  dropDown,
  children
}: NavItemSwitchProps): JSX.Element => {
  const [isSwitched, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle()
  })
  const editToggle = (): void => {
    toggle()
  }
  const dropDownWitoEditToggle = React.cloneElement(dropDown, {
    editToggle
  })

  const methods = {
    isSwitched,
    ref,
    toggle,
    dropDownWitoEditToggle
  }

  return <>{children(methods)}</>
}
