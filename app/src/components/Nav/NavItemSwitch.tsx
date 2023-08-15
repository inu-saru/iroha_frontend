import React, { useRef } from "react"
import { useClickAway, useToggle } from "react-use"

interface MethodsProps {
  isSwitched: boolean
  ref: any
  toggle: () => void
}

interface NavItemSwitchProps {
  children: (methods: MethodsProps) => React.ReactNode
}

export const NavItemSwitch = ({
  children
}: NavItemSwitchProps): JSX.Element => {
  const [isSwitched, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle()
  })

  const methods = {
    isSwitched,
    ref,
    toggle
  }

  return <>{children(methods)}</>
}
