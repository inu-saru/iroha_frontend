interface ContentItemProps {
  resourceId: string | undefined
  original: string | undefined
  translation: string | undefined
  dropDown?: JSX.Element
}

export const ContentItem = ({
  resourceId,
  original,
  translation,
  dropDown
}: ContentItemProps): JSX.Element => {
  return (
    <div className="bg-white px-8 py-4 border-b border-natural-40 relative group break-words">
      <div className="flex gap-x-8 items-center">
        <div className="text-h300 w-full">{original}</div>
        <div className="text-middle text-natural-700 w-full">{translation}</div>
      </div>
      {dropDown !== undefined && (
        <div className="absolute w-max inset-y-0 right-8 top-4 h-6 opacity-0 invisible group-hover:visible opacity-100">
          {dropDown}
        </div>
      )}
    </div>
  )
}
