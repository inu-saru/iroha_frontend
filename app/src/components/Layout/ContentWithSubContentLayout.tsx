import * as React from "react"

interface ContentWithSubContentLayoutProps {
  children: React.ReactNode
  subContentKey: string | null
}

export const ContentWithSubContentLayout = ({ children, subContentKey }: ContentWithSubContentLayoutProps): JSX.Element => {
  const content = children.find( (item) => item.key === "content")
  const subContent = children.find( (item) => item.key === subContentKey)

  return (
    <>
      <div className="flex h-full">
        <div className="flex-1">{content}</div>
        { 
          subContentKey &&
            <div className="w-96 border-l border-natural-40">{subContent}</div>
        }
      </div>
    </>
  )
}
