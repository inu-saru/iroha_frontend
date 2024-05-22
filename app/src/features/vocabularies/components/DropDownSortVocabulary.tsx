import {
  Button,
  DropDown,
  DropDownItem,
  Icon,
  type IconVariant
} from "@/components/Elements"

import { useUrlParams } from "@/lib/useUrlParams"

export const DropDownSortVocabulary = (): JSX.Element => {
  const { config, searchParams, setSearchParams } = useUrlParams()

  const sort = searchParams.get("sort")
  let selectedIcon: IconVariant
  let selectedLabel
  switch (sort) {
    case "en_asc":
      selectedIcon = "nameAsc"
      selectedLabel = "名前(a-z)"
      break
    case "en_desc":
      selectedIcon = "nameDesc"
      selectedLabel = "名前(z-a)"
      break
    case "date_asc":
      selectedIcon = "sortAsc"
      selectedLabel = "日付"
      break
    default:
      selectedIcon = "sortDesc"
      selectedLabel = "日付"
      break
  }

  return (
    <DropDown
      trigger={
        <Button
          className="hover:bg-primary-20 relative group list-none"
          variant="secondary"
          size="small"
          startIcon={<Icon variant={selectedIcon} />}
        >
          {selectedLabel}
        </Button>
      }
    >
      <DropDownItem
        icon={<Icon variant="sortDesc" />}
        radioName={"sortVocabulary"}
        radioChecked={selectedIcon === "sortDesc"}
        label="日付"
        handleClick={() => {
          setSearchParams({ ...config, sort: "date_desc" })
        }}
      />
      <DropDownItem
        icon={<Icon variant="sortAsc" />}
        radioName={"sortVocabulary"}
        radioChecked={selectedIcon === "sortAsc"}
        label="日付"
        handleClick={() => {
          setSearchParams({ ...config, sort: "date_asc" })
        }}
      />
      <DropDownItem
        icon={<Icon variant="nameAsc" />}
        radioName={"sortVocabulary"}
        radioChecked={selectedIcon === "nameAsc"}
        label="名前(a-z)"
        handleClick={() => {
          setSearchParams({ ...config, sort: "en_asc" })
        }}
      />
      <DropDownItem
        icon={<Icon variant="nameDesc" />}
        radioName={"sortVocabulary"}
        radioChecked={selectedIcon === "nameDesc"}
        label="名前(z-a)"
        handleClick={() => {
          setSearchParams({ ...config, sort: "en_desc" })
        }}
      />
    </DropDown>
  )
}
