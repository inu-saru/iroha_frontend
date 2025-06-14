import React from "react"
import { BasicLayout } from "@/components/Layout"
import { OuterSpaceNav } from "@/features/misc/components/OuterSpaceNav"
import { ContentSpaceUpdate } from "../components/ContentSpaceUpdate"

export const SpaceUpdate = (): JSX.Element => {
  return (
    <BasicLayout
      title="スペース編集"
      nav={<OuterSpaceNav />}
    >
      <ContentSpaceUpdate />
    </BasicLayout>
  )
}
