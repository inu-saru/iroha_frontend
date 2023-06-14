import { Link } from "../Elements"

interface ListItemProps {
  resource: object
  to?: string
}

export const ListItem = ({
  resource,
  to = "/app"
}: ListItemProps): JSX.Element => {
  return (
    <>
      <li className="bg-white border-b border-natural-40 hover:bg-primary-20">
        <Link to={to} className="block p-4 truncate">
          <div className="text-h300 text-natural-900">{resource.en}</div>
          <div className="mt-2 text-middle text-natural-700">{resource.ja}</div>
        </Link>
      </li>
    </>
  )
}
