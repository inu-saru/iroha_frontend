import { type Schema } from "zod"

import { Icon } from "@/components/Elements"
import { Form } from "@/components/Form"
import { type VocabularySearchParams } from "@/features/vocabularies/types"

interface SearchProps {
  schema?: Schema
  maxLength?: number
  placeholder?: string
  config?: VocabularySearchParams
  setSearchParams: (config: VocabularySearchParams) => void
}

export const Search = ({
  schema,
  maxLength = 255,
  placeholder = "SEARCH",
  config = {},
  setSearchParams
}: SearchProps): JSX.Element => {
  const onSubmit = async (data: any): Promise<void> => {
    setSearchParams({ ...config, ...data })
  }

  return (
    <div className="flex items-center pl-2 h-8 rounded-sm bg-white border border-natural-40 w-56 max-md:w-48">
      <Icon variant="search" className="mr-1" />

      <div className="w-full pr-2">
        <Form
          onSubmit={onSubmit}
          options={{
            defaultValues: {
              q: config.q
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <input
                maxLength={maxLength}
                className="w-full outline-none text-natural-900 text-small placeholder-natural-50 "
                placeholder={placeholder}
                {...register("q")}
              />
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
