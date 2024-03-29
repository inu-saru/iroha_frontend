import { useNavigate } from "react-router-dom"

import { DropDown, DropDownItem, Icon } from "@/components/Elements"

import { useUrlParams } from "@/lib/useUrlParams"

interface DropDownVocabularyProps {
  resourceId?: string
  label?: string
  deleteToggle: (data: object) => void
}

export const DropDownVocabulary = ({
  resourceId,
  label,
  deleteToggle
}: DropDownVocabularyProps): JSX.Element => {
  const { spaceId, searchParams } = useUrlParams()
  const navigate = useNavigate()

  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="white" />}>
      <DropDownItem
        label="編集"
        handleClick={() => {
          navigate(
            `/app/spaces/${spaceId}/vocabularies/${resourceId}/edit?${searchParams.toString()}`
          )
        }}
      />
      <DropDownItem
        label="削除"
        handleClick={() => {
          deleteToggle({
            vocabularyId: resourceId,
            label
          })
        }}
      />
    </DropDown>
  )
}
