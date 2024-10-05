import { Route, Routes } from "react-router-dom"

import { Vocabulary } from "./Vocabulary"
import { VocabularyCreate } from "./VocabularyCreate"
import { Vocabularies } from "./Vocabularies"
import { VocabularyUpdate } from "./VocabularyUpdate"
import { VocabularyBulkCreate } from "./VocabularyBulkCreate"
 
export const VocabularyRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<Vocabularies />}>
        <Route path="" element={null} />
        <Route path="new" element={<VocabularyCreate />} />
        <Route path=":vocabularyId" element={<Vocabulary />} />
        <Route path=":vocabularyId/edit" element={<VocabularyUpdate />} />
        <Route path="bulk/new" element={<VocabularyBulkCreate />} />
      </Route>
    </Routes>
  )
}
