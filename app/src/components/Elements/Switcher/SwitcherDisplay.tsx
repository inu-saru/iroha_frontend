import { useRef } from "react"
import { useClickAway, useToggle } from "react-use"

interface MethodsProps {
  isOpen: boolean
  clickAway: React.MutableRefObject<null>
  toggle: () => void
}

interface SwitcherDisplayProps {
  children: (methods: MethodsProps) => React.ReactNode
}

export const SwitcherDisplay = ({
  children
}: SwitcherDisplayProps): JSX.Element => {
  const [isOpen, toggle] = useToggle(false)
  const clickAway = useRef(null)
  useClickAway(clickAway, () => {
    toggle()
  })
  const methods = {
    isOpen,
    clickAway,
    toggle
  }

  return <>{children(methods)}</>
}
