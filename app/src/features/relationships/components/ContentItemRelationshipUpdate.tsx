import { z } from "zod"

import { Button, Form, Input, Spinner } from "@/components/Elements"

import { useUpdateRelationship } from "../api/updateRelationship"
import { useUrlParams } from "@/lib/useUrlParams"
import { useVocabulary } from "@/features/vocabularies/api/getVocabulary"

import { type Follow } from "../types"

interface ContentItemRelationshipUpdateProps {
  resource: Follow
  toggle: () => void
}

const schema = z.object({
  en: z.string().min(1, { message: "1文字以上入力する必要があります。" }),
  ja: z.string().min(0)
})

export const ContentItemRelationshipUpdate = ({
  resource,
  toggle
}: ContentItemRelationshipUpdateProps): JSX.Element => {
  const { spaceId, vocabularyId, config } = useUrlParams()

  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId: resource.id })

  const updateRelationshipMutation = useUpdateRelationship({
    spaceId,
    vocabularyId,
    resource,
    config
  })

  const onSubmit = async (data: any): Promise<void> => {
    const vocabularyUpdateParams = {
      method: "PUT",
      url: `/api/v1/spaces/${spaceId}/vocabularies/${resource.id}`,
      body: {
        vocabulary: {
          en: data.en,
          ja: data.ja
        }
      }
    }
    const relationshipUpdateParams = {
      method: "PUT",
      url: `/api/v1/spaces/${spaceId}/relationships/${resource.relationship_id}`,
      body: {
        relationship: {
          positions: []
        }
      }
    }
    const output = {
      requests: [vocabularyUpdateParams]
    }

    await updateRelationshipMutation.mutateAsync({
      data: output
    })
    toggle()
  }

  if (vocabularyQuery.isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className="px-8 py-4 border-b border-natural-40">
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
              <div className="flex justify-end gap-x-4">
                <Button variant="secondary" onClick={toggle}>
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  isLoading={updateRelationshipMutation.isLoading}
                >
                  更新
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  )
}
