import { Search } from "@/components/Elements"
import { z } from "zod"

const schema = z.object({
  q: z.string().min(0, "Required")
})

interface ListFilterProps {
  config?: object
  setSearchParams: () => void
}

export const ListFilter = ({
  config = {},
  setSearchParams
}: ListFilterProps): JSX.Element => {
  return (
    <>
      <div className="px-4 py-2 border-b border-natural-40">
        <Search
          schema={schema}
          config={config}
          setSearchParams={setSearchParams}
        />
      </div>
    </>
  )
}
