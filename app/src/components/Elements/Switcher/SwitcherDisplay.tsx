import { useRef } from "react"
import { useClickAway, useToggle } from "react-use"

interface MethodsProps {
  isOpen: boolean
  ref: React.MutableRefObject<null>
  toggle: () => void
}

interface NavItemSwitchProps {
  children: (methods: MethodsProps) => React.ReactNode
}

export const SwitcherDisplay = ({
  children
}: NavItemSwitchProps): JSX.Element => {
  const [isOpen, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle()
  })
  const methods = {
    isOpen,
    ref,
    toggle
  }

  return <>{children(methods)}</>
}
