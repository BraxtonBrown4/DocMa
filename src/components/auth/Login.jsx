import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="login-container">
      <form onSubmit={handleLogin}>
        <h1 className="border-box">Welcome To DocMa</h1>
        <h2>A User Friendly Document Manager</h2>
        <h1 className="vertical-spacing">Login</h1>
        <fieldset className="vertical-spacing">
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(evt) => set(evt.target.value)}
            placeholder="Email address"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="vertical-spacing">
          <button className="login-btn" type="submit">Login</button>
        </fieldset>
        <fieldset className="vertical-spacing">
          <button className="login-btn" onClick={() => { navigate('/register') }}>Create An Account</button>
        </fieldset>
      </form>
    </main>
  )
}

