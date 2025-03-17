import { Routes, Route } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { UserProvider } from "./contexts/UserIdContext"

export const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
        <Authorized>
          <UserProvider>
            <ApplicationViews />
          </UserProvider>
        </Authorized>
      } />
    </Routes>

  )
}
