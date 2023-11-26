import { SpaceNavItemHeader, NavItemsSpace } from "@/features/spaces"

export const OuterSpaceNav = (): JSX.Element => {
  return (
    <div className="w-56 border-r border-natural-40 h-screen bg-white overflow-y-auto">
      <div className="p-2 border-b border-natural-40">
        <p className="text-h300 text-primary-300">logo</p>
      </div>
      <SpaceNavItemHeader />
      <NavItemsSpace />
    </div>
  )
}
