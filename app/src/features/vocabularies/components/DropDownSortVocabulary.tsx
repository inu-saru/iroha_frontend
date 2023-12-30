import { Button, DropDown, DropDownItem, Icon } from "@/components/Elements"

import { useUrlParams } from "@/lib/useUrlParams"

export const DropDownSortVocabulary = (): JSX.Element => {
  const { config, searchParams, setSearchParams } = useUrlParams()

  const sort = searchParams.get("sort")
  let icon
  let label
  switch (sort) {
    case "date_asc":
      icon = "sortAsc"
      label = "日付"
      break
    default:
      icon = "sortDesc"
      label = "日付"
      break
  }

  return (
    <DropDown
      trigger={
        <Button
          className="hover:bg-primary-20 relative group list-none"
          variant="secondary"
          size="small"
          startIcon={<Icon variant={icon} />}
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
