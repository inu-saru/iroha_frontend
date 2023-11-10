import { useLocation } from "react-router-dom"
import { useDisclosure } from "@/hooks/useDisclosure"

interface MethodsProps {
  isOpenOnPath: () => boolean
  openWithPath: () => void
  closeWith: () => void
}

interface SwitcherDisplayWithPathProps {
  children: (methods: MethodsProps) => React.ReactNode
}

export const SwitcherDisplayWithPath = ({
  children
}: SwitcherDisplayWithPathProps): JSX.Element => {
  const { targetData, openWith, closeWith, isOpen } = useDisclosure()
  const pathname = useLocation().pathname

  const isOpenOnPath = (): boolean => {
    return pathname === targetData.pathname && isOpen
  }

  const openWithPath = (): void => {
    openWith({ pathname })
  }

  const methods = {
    isOpenOnPath,
    openWithPath,
    closeWith
  }

  return <>{children(methods)}</>
}
