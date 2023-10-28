import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { ContentHeader } from "@/components/Content"
import { Button, Form, Input } from "@/components/Elements"

import { useCreateVocabulary } from "../api/createVocabulary"
import { useUrlParams } from "@/lib/useUrlParams"

const schema = z.object({
  en: z.string().min(1, { message: "1文字以上入力する必要があります。" }),
  ja: z.string().min(0)
})

export const ContentElementVocabularyCreate = (): JSX.Element => {
  const { spaceId, searchParams, config } = useUrlParams()
  const createVocabularyMutation = useCreateVocabulary({ config, spaceId })
  const navigate = useNavigate()

  const onSubmit = async (data: any): Promise<void> => {
    const output = {
      ...data,
      section_id: searchParams.get("sid")
    }
    const vocabulary = await createVocabularyMutation.mutateAsync({
      data: output
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
      <div className="p-8 border-b border-natural-40">
        <Form onSubmit={onSubmit} schema={schema}>
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
                <Button type="submit">作成</Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  )
}
