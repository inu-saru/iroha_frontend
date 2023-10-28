import { z } from "zod"

import { ContentFooter } from "@/components/Content"
import { Button, Form, Input } from "@/components/Elements"

import { useCreateRelationship } from "../api/createRelationship"
import { useUrlParams } from "@/lib/useUrlParams"

interface ContentFooterRelationshipCreateProps {
  toggle: () => void
}

const schema = z.object({
  en: z.string().min(1, { message: "1文字以上入力する必要があります。" }),
  ja: z.string().min(0)
})

export const ContentFooterRelationshipCreate = ({
  toggle
}: ContentFooterRelationshipCreateProps): JSX.Element => {
  const { spaceId, vocabularyId, searchParams, config } = useUrlParams()
  const createRelationshipMutation = useCreateRelationship({
    spaceId,
    vocabularyId,
    config
  })

  const onSubmit = async (data: any): Promise<void> => {
    const vocabularyCreateParams = {
      method: "POST",
      url: `/api/v1/spaces/${spaceId}/vocabularies`,
      body: {
        vocabulary: {
          en: data.en,
          ja: data.ja,
          section_id: searchParams.get("sid")
        }
      },
      store: [{ response_key: "id", as: "follower_id" }]
    }
    const relationshipCreateParams = {
      method: "POST",
      url: `/api/v1/spaces/${spaceId}/relationships`,
      body: {
        relationship: {
          followed_id: vocabularyId,
          language_type: "en",
          positions: []
        }
      },
      store_merge_to: "relationship"
    }
    const output = {
      requests: [vocabularyCreateParams, relationshipCreateParams]
    }

    await createRelationshipMutation.mutateAsync({
      data: output
    })
    toggle()
  }

  return (
    <>
      <ContentFooter>
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
              <div className="flex justify-end gap-x-4">
                <Button variant="secondary" onClick={toggle}>
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  isLoading={createRelationshipMutation.isLoading}
                >
                  関連語の作成
                </Button>
              </div>
            </>
          )}
        </Form>
      </ContentFooter>
    </>
  )
}
