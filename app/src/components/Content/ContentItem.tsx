interface ContentItemProps {
  children: React.ReactNode
  dropDown?: JSX.Element
}

export const ContentItem = ({
  children,
  dropDown
}: ContentItemProps): JSX.Element => {
  return (
    <div className="bg-white px-8 py-4 border-b border-natural-40 relative group break-words">
      {children}
      {dropDown !== undefined && (
        <div className="absolute w-max inset-y-0 right-8 top-4 h-6 opacity-0 invisible group-hover:visible opacity-100">
          {dropDown}
        </div>
      )}
    </div>
  )
}
