import { Route, Routes } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>HOME</div>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  )
}

export default App
