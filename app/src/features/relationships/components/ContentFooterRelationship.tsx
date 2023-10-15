import { Button } from "@/components/Elements/Button"
import { SwitcherDisplayWithPath } from "@/components/Elements"
import { ContentFooter } from "@/components/Content/ContentFooter"

import { ContentFooterRelationshipCreate } from "./ContentFooterRelationshipCreate"

export const ContentFooterRelationship = (): JSX.Element => {
  return (
    <>
      <SwitcherDisplayWithPath>
        {(methods) => (
          <>
            {methods.isOpenOnPath() ? (
              <ContentFooterRelationshipCreate toggle={methods.closeWith} />
            ) : (
              <ContentFooter>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={methods.openWithPath}
                  >
                    関連語の作成
                  </Button>
                </div>
              </ContentFooter>
            )}
          </>
        )}
      </SwitcherDisplayWithPath>
    </>
  )
}
