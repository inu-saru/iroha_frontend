import { Icon, Link } from "../Elements"

interface ContentHeaderProps {
  to: string
}

export const ContentHeader = ({ to }: ContentHeaderProps): JSX.Element => {
  return (
    <div className="p-2 h-10 bg-white border-b border-natural-40">
      <Link to={to} className="block">
        <Icon className="float-left mr-2" bgColor="white" variant="close" />
      </Link>
    </div>
  )
}
