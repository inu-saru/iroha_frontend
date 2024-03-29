import { Chip, Search } from "@/components/Elements"
import { type VocabularySearchParams } from "@/features/vocabularies/types"
import { z } from "zod"

const schema = z.object({
  q: z.string().min(0, "Required")
})

interface ListFilterProps {
  config?: VocabularySearchParams
  setSearchParams: (config: VocabularySearchParams) => void
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
        <div className="mt-2 flex gap-x-2">
          <Chip
            size="small"
            onClick={() => {
              const { vocabulary_type, ...other } = config
              setSearchParams({ ...other })
            }}
            isActive={config.vocabulary_type === undefined}
          >
            全て
          </Chip>
          <Chip
            onClick={() => {
              setSearchParams({ ...config, vocabulary_type: "sentence" })
            }}
            isActive={config.vocabulary_type === "sentence"}
          >
            文章
          </Chip>
          <Chip
            onClick={() => {
              setSearchParams({ ...config, vocabulary_type: "word" })
            }}
            isActive={config.vocabulary_type === "word"}
          >
            単語
          </Chip>
        </div>
      </div>
    </>
  )
}
