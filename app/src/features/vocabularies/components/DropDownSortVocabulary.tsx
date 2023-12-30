import { Button, DropDown, DropDownItem, Icon } from "@/components/Elements"

import { useUrlParams } from "@/lib/useUrlParams"

export const DropDownSortVocabulary = (): JSX.Element => {
  const { config, searchParams, setSearchParams } = useUrlParams()

  const sort = searchParams.get("sort")
  let label
  switch (sort) {
    case "date_asc":
      label = "日付(昇順)"
      break
    default:
      label = "日付(降順)"
      break
  }

  return (
    <DropDown
      trigger={
        <Button
          className="hover:bg-primary-20 relative group list-none"
          variant="secondary"
          size="small"
          startIcon={<Icon variant="sort" />}
        >
          {label}
        </Button>
      }
    >
      <DropDownItem
        label="日付(降順)"
        handleClick={() => {
          console.log({ ...searchParams })
          setSearchParams({ ...config, sort: "date_desc" })
        }}
      />
      <DropDownItem
        label="日付(昇順)"
        handleClick={() => {
          setSearchParams({ ...config, sort: "date_asc" })
        }}
      />
    </DropDown>
  )
}
