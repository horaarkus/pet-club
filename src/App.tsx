import { Route, Routes } from "react-router-dom"
import { loginSuccess } from "./features/login/loginSlice"
import { store } from "./app/store"
import Login from "./features/login/Login"
import Dashboard from "./features/dashboard/Dashboard"
import "./App.css"

function App() {
  const savedAuthState = localStorage.getItem("loginState")
  if (savedAuthState) {
    const parsedAuthState = JSON.parse(savedAuthState)
    store.dispatch(loginSuccess(parsedAuthState))
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
