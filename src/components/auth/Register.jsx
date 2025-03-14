import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    department: 0,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
      department: parseInt(user.department),
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main>
      <form onSubmit={handleRegister}>
        <h1>Learning Moments</h1>
        <h2>Please Register</h2>
        <fieldset>
          <input
            onChange={updateUser}
            type="text"
            id="fullName"
            className="auth-form-input"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="auth-form-input"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          
        </fieldset>
        <fieldset>
          <button type="submit">Sign In</button>
        </fieldset>
        <fieldset>
          <button onClick={()=>{navigate("/login")}}>Cancel</button>
        </fieldset>
      </form>
    </main>
  )
}
