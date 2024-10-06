import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { ContentHeader } from "@/components/Content"
import { Button, Form, Input } from "@/components/Elements"

import { useCreateVocabularyBulk } from "../api/createVocabularyBulk"
import { useUrlParams } from "@/lib/useUrlParams"

const schema = z.object({
  q: z.string().min(1, { message: "1文字以上入力する必要があります。" }),
})

export const ContentElementVocabularyBulkCreate = (): JSX.Element => {
  const { spaceId, searchParams, config } = useUrlParams()
  const createVocabularyBulkMutation = useCreateVocabularyBulk({ config, spaceId })
  const navigate = useNavigate()

  const onSubmit = async (data: any): Promise<void> => {
    const output = {
      ...data,
      section_id: searchParams.get("sid"),
      vocabulary_type: "sentence"
    }
    const vocabularyBulk = await createVocabularyBulkMutation.mutateAsync({
      data: output
    })
    navigate(
      `/app/spaces/${spaceId}/vocabularies/${
        vocabularyBulk.vocabulary.id
      }?${searchParams.toString()}`
    )
  }
  return (
    <>
      <ContentHeader
        to={`/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`}
      />
      <div className="p-8 border-b border-natural-40">
        <Form onSubmit={onSubmit} schema={schema}>
          {({ register, formState }) => (
            <>
              <Input
                type="text"
                label="文章"
                error={formState.errors.en}
                registration={register("q")}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={createVocabularyBulkMutation.isLoading}
                >
                  作成
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  )
}
