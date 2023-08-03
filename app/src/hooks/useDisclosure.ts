import * as React from "react"

export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = React.useState(initial)
  const [targetData, setTargetData] = React.useState<any>({})

  const open = React.useCallback(() => {
    setIsOpen(true)
  }, [])
  const close = React.useCallback(() => {
    setIsOpen(false)
  }, [])
  const toggle = React.useCallback(() => {
    setIsOpen((state) => !state)
  }, [])

  const openWith = React.useCallback((data: object) => {
    open()
    setTargetData(data)
  }, [])
  const closeWith = React.useCallback(() => {
    close()
    setTargetData({})
  }, [])
  const toggleWith = React.useCallback((data: object = {}) => {
    toggle()
    setTargetData(data)
  }, [])

  return {
    isOpen,
    open,
    close,
    toggle,
    targetData,
    openWith,
    closeWith,
    toggleWith
  }
}
