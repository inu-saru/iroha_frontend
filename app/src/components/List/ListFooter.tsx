import { Spinner } from "../Elements"

interface ListFooterProps {
  count: string
  isLoading?: boolean
}

export const ListFooter = ({
  count,
  isLoading = false
}: ListFooterProps): JSX.Element => {
  return (
    <>
      <div className="text-default text-natural-700 text-center py-4 bg-white">
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          count + " items"
        )}
      </div>
    </>
  )
}
