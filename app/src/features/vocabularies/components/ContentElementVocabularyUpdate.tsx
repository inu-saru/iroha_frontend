import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { z } from "zod"

import { ContentHeader } from "@/components/Content"
import { Button, Form, Input } from "@/components/Elements"
import { useUpdateVocabulary } from "../api/updateVocabulary"
import { useVocabulary } from "../api/getVocabulary"
import { type SearchParams } from "@/types"

const schema = z.object({
  en: z.string().min(1, { message: "1文字以上入力する必要があります。" }),
  ja: z.string().min(0)
})

export const ContentElementVocabularyUpdate = (): JSX.Element => {
  const { spaceId, vocabularyId } = useParams<{
    spaceId: string
    vocabularyId: string
  }>()
  const [searchParams] = useSearchParams()
  const entries = Array.from(searchParams.entries())
  const config: SearchParams = {}
  for (const [key, value] of entries) {
    config[key] = value
  }
  const navigate = useNavigate()

  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId })
  const updateVocabularyMutation = useUpdateVocabulary({ config, spaceId })

  const onSubmit = async (data: any): Promise<void> => {
    const output = {
      ...data,
      section_id: searchParams.get("sid")
    }
    const vocabulary = await updateVocabularyMutation.mutateAsync({
      data: output,
      vocabularyId
    })
    navigate(
      `/app/spaces/${spaceId}/vocabularies/${
        vocabulary.id
      }?${searchParams.toString()}`
    )
  }

  return (
    <>
      <ContentHeader
        to={`/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`}
      />
      <div className="p-8 bg-white border-b border-natural-40">
        <Form
          onSubmit={onSubmit}
          options={{
            defaultValues: {
              en: vocabularyQuery.data?.en,
              ja: vocabularyQuery.data?.ja
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <Input
                type="text"
                label="英語文"
                error={formState.errors.en}
                registration={register("en")}
              />
              <Input
                type="text"
                label="日本語文"
                error={formState.errors.ja}
                registration={register("ja")}
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    navigate(
                      `/app/spaces/${spaceId}/vocabularies/${vocabularyId}?${searchParams.toString()}`
                    )
                  }}
                  variant="secondary"
                  className="mr-4"
                >
                  キャンセル
                </Button>
                <Button type="submit">更新</Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  )
}
