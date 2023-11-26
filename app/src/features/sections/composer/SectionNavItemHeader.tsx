import { SwitcherDisplay } from "@/components/Elements"
import { NavItemHeaderSection } from "../components/NavItemHeaderSection"
import { NavItemSectionCreate } from "../components/NavItemSectionCreate"

export const SectionNavItemHeader = (): JSX.Element => {
  return (
    <SwitcherDisplay>
      {(methods) => (
        <>
          <NavItemHeaderSection toggle={methods.toggle} />
          {methods.isOpen && (
            <div ref={methods.clickAway}>
              <NavItemSectionCreate toggle={methods.toggle} />
            </div>
          )}
        </>
      )}
    </SwitcherDisplay>
  )
}
