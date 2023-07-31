interface ListHeaderProps {
  label: string | undefined
}

export const ListHeader = ({ label }: ListHeaderProps): JSX.Element => {
  return (
    <>
      <h3 className="text-h200 text-natural-700 py-2 px-4 bg-white border-b border-natural-40 truncate">
        {label}
      </h3>
    </>
  )
}
