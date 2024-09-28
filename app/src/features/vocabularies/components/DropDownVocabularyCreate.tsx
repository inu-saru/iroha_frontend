import { useNavigate } from "react-router-dom"

import { Button ,DropDown, DropDownItem, Icon } from "@/components/Elements"

import { useUrlParams } from "@/lib/useUrlParams"

export const DropDownVocabularyCreate = (): JSX.Element => {
  const { spaceId, searchParams } = useUrlParams()
  const navigate = useNavigate()

  return (
    <DropDown
      trigger={
        <Button
            variant="primary"
          >
            新規作成
        </Button>
      }
      position="left"
    >
      <DropDownItem
        label="作成"
        handleClick={() => {
          navigate(
            `/app/spaces/${spaceId}/vocabularies/new?${searchParams.toString()}`
          )
        }}
      />
    </DropDown>
  )
}
