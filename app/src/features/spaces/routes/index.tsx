import { Route, Routes } from "react-router-dom"

import { SpaceCreate } from "./SpaceCreate"
import { SpaceUpdate } from "./SpaceUpdate"
 
export const SpaceRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="new" element={<SpaceCreate />} />
      <Route path=":spaceId/edit" element={<SpaceUpdate />} />
    </Routes>
  )
}
