import { SwitcherDisplayWithPath } from "@/components/Elements"

import { ContentFooterRelationship } from "../components/ContentFooterRelationship"
import { ContentFooterRelationshipCreate } from "../components/ContentFooterRelationshipCreate"

export const RelationshipContentFooter = (): JSX.Element => {
  return (
    <>
      <SwitcherDisplayWithPath>
        {(methods) => (
          <>
            {methods.isOpenOnPath() ? (
              <ContentFooterRelationshipCreate toggle={methods.closeWith} />
            ) : (
              <ContentFooterRelationship toggle={methods.openWithPath} />
            )}
          </>
        )}
      </SwitcherDisplayWithPath>
    </>
  )
}
export { ContentFooterRelationship }
