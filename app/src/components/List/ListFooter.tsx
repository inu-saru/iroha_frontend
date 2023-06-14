interface ListFooterProps {
  count: string
}

export const ListFooter = ({ count }: ListFooterProps): JSX.Element => {
  return (
    <>
      <div className="text-default text-natural-700 text-center py-4 bg-white">
        {count} items
      </div>
    </>
  )
}
