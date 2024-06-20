// @ts-nocheck

import clsx from "clsx"

import { ReactComponent as AddActive } from "@/assets/icons/add_active.svg"
import { ReactComponent as Add } from "@/assets/icons/add.svg"
import { ReactComponent as All } from "@/assets/icons/all.svg"
import { ReactComponent as ArrowLeft } from "@/assets/icons/arrow_left.svg"
import { ReactComponent as ArrowDown } from "@/assets/icons/arrow_down.svg"
import { ReactComponent as ArrowRight } from "@/assets/icons/arrow_right.svg"
import { ReactComponent as ArrowUp } from "@/assets/icons/arrow_up.svg"
import { ReactComponent as Close } from "@/assets/icons/close.svg"
import { ReactComponent as Default } from "@/assets/icons/default.svg"
import { ReactComponent as Disabled } from "@/assets/icons/disabled.svg"
import { ReactComponent as EditActive } from "@/assets/icons/edit_active.svg"
import { ReactComponent as Edit } from "@/assets/icons/edit.svg"
import { ReactComponent as Mic } from "@/assets/icons/mic.svg"
import { ReactComponent as MoreHoriz } from "@/assets/icons/more_horiz.svg"
import { ReactComponent as Pending } from "@/assets/icons/pending.svg"
import { ReactComponent as Search } from "@/assets/icons/search.svg"
import { ReactComponent as Section } from "@/assets/icons/section.svg"
import { ReactComponent as SortAsc } from "@/assets/icons/sort_asc.svg"
import { ReactComponent as SortDesc } from "@/assets/icons/sort_desc.svg"
import { ReactComponent as NameAsc } from "@/assets/icons/name_asc.svg"
import { ReactComponent as NameDesc } from "@/assets/icons/name_desc.svg"
import { ReactComponent as Space } from "@/assets/icons/space.svg"
import { ReactComponent as Stop } from "@/assets/icons/stop.svg"
import { ReactComponent as VolumeUp } from "@/assets/icons/volume_up.svg"

const variants = {
  default: <Default />,
  addActive: <AddActive />,
  add: <Add />,
  all: <All />,
  arrowLeft: <ArrowLeft />,
  arrowDown: <ArrowDown />,
  arrowRight: <ArrowRight />,
  arrowUp: <ArrowUp />,
  close: <Close />,
  disabled: <Disabled />,
  editActive: <EditActive />,
  edit: <Edit />,
  mic: <Mic />,
  moreHoriz: <MoreHoriz />,
  pending: <Pending />,
  search: <Search />,
  section: <Section />,
  sortAsc: <SortAsc />,
  sortDesc: <SortDesc />,
  nameAsc: <NameAsc />,
  nameDesc: <NameDesc />,
  space: <Space />,
  stop: <Stop />,
  volumeUp: <VolumeUp />
}

export type IconVariant = keyof typeof variants

const bgColors = {
  default: "",
  primary: "bg-primary-20 hover:bg-natural-10",
  white: "bg-white hover:bg-primary-20"
}

interface IconProps {
  variant?: IconVariant
  bgColor?: keyof typeof bgColors
  className?: string
}

export const Icon = ({
  variant = "default",
  bgColor = "default",
  className = ""
}: IconProps): JSX.Element => {
  return (
    <div className={clsx("h-6 w-6 rounded-sm ", bgColors[bgColor], className)}>
      {variants[variant]}
    </div>
  )
}
