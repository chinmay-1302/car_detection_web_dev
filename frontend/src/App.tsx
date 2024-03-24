import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ResultsPage from "./Pages/ResultsPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </>
  )
}

export default App
