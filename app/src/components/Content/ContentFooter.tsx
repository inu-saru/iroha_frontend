interface ContentFooterProps {
  children: React.ReactNode
}

export const ContentFooter = ({
  children
}: ContentFooterProps): JSX.Element => {
  return (
    <div className="px-8 py-4 bg-white border-t border-natural-40">
      {children}
    </div>
  )
}
