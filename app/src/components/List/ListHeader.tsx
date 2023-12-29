interface ListHeaderProps {
  children: React.ReactNode
}

export const ListHeader = ({ children }: ListHeaderProps): JSX.Element => {
  return (
    <>
      <h3 className="py-2 px-4 bg-white border-b border-natural-40 truncate">
        {children}
      </h3>
    </>
  )
}
