import React from "react"
import { BasicLayout } from "@/components/Layout"
import { OuterSpaceNav } from "@/features/misc/components/OuterSpaceNav"
import { ContentSpaceCreate } from "../components/ContentSpaceCreate"

export const SpaceCreate = (): JSX.Element => {
  return (
    <BasicLayout
      title="スペース作成"
      nav={<OuterSpaceNav />}
    >
      <ContentSpaceCreate />
    </BasicLayout>
  )
}
