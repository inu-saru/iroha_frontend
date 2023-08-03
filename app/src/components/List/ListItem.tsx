import { NavLink } from "react-router-dom"
import { type Vocabulary } from "@/features/vocabularies/types"

interface ListItemProps {
  resource: Vocabulary
  to?: string
}

export const ListItem = ({
  resource,
  to = "/app"
}: ListItemProps): JSX.Element => {
  return (
    <>
      <li className="bg-white border-b border-natural-40 hover:bg-primary-20">
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive ? "block p-4 bg-primary-30" : "block p-4"
          }
        >
          <div className="text-h300 text-natural-900 truncate">
            {resource.en}
          </div>
          <div className="mt-2 text-middle text-natural-700 truncate">
            {resource.ja}
          </div>
        </NavLink>
      </li>
    </>
  )
}
