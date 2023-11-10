import { Button } from "@/components/Elements/Button"
import { ContentFooter } from "@/components/Content/ContentFooter"

interface ContentFooterRelationshipProps {
  toggle: () => void
}

export const ContentFooterRelationship = ({
  toggle
}: ContentFooterRelationshipProps): JSX.Element => {
  return (
    <ContentFooter>
      <div className="flex justify-end">
        <Button type="button" variant="primary" onClick={toggle}>
          関連語の作成
        </Button>
      </div>
    </ContentFooter>
  )
}
