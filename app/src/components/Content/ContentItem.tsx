interface ContentItemProps {
  resourceId: string | undefined
  original: string | undefined
  translation: string | undefined
}

export const ContentItem = ({
  resourceId,
  original,
  translation
}: ContentItemProps): JSX.Element => {
  return (
    <div className="bg-white px-8 py-4 border-b border-natural-40 relative group break-words">
      <div className="flex gap-x-8 items-center">
        <div className="text-h300 w-full">{original}</div>
        <div className="text-middle text-natural-700 w-full">{translation}</div>
      </div>
    </div>
  )
}
