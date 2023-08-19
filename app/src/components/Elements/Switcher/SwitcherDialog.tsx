import { useDisclosure } from "@/hooks/useDisclosure"

interface MethodsProps {
  isOpen: boolean
  targetData: any
  openWith: (data: object) => void
  closeWith: () => void
}

interface switchProps {
  children: (methods: MethodsProps) => React.ReactNode
}

export const SwitcherDialog = ({ children }: switchProps): JSX.Element => {
  const { targetData, openWith, closeWith, isOpen } = useDisclosure()

  const methods = {
    isOpen,
    targetData,
    openWith,
    closeWith
  }

  return <>{children(methods)}</>
}
