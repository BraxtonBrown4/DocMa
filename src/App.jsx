import { Routes, Route } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>

  )
}
