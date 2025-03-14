import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown } from "react-bootstrap"
import { getAllDepartments } from "../../services/departmentService"

export const Register = (props) => {
  const [allDepartments, setAllDepartments] = useState([])
  const [departmentPH, setDepartmentPH] = useState('Departments')
  const [redHighlight, setRedHighlight] = useState("")
  const [user, setUser] = useState({
    departmentId: 0,
    title: "",
    fullName: "",
    email: "",
  })
  let navigate = useNavigate()

  useEffect(() => {
    getAllDepartments().then((res) => {
      setAllDepartments(res)
    })
  }, [])

  const registerNewUser = () => {

    if (user.departmentId > 0) {
      const newUser = {
        ...user,
        employmentDate: Math.floor(Date.now() / 1000),
      }
  
  
      createUser(newUser).then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "docma_user",
            JSON.stringify({
              id: createdUser.id,
              staff: createdUser.isStaff,
            })
          )
  
          navigate("/")
        }
      })
    } else {
      alert('Please Select A Department')
    }

  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
        setRedHighlight('red-highlight')
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

  const handleDepartmentClick = (depId, depName) => {
    const copy = { ...user }
    copy.departmentId = depId
    setUser(copy)

    setDepartmentPH(depName)
  }

  return (
    <main className="login-container">
      <form onSubmit={handleRegister}>
        <h1 className="border-box">Welcome To DocMa</h1>
        <h2>A User Friendly Document Manager</h2>
        <h1 className="vertical-spacing">Create An Account</h1>
        <fieldset className="vertical-spacing">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              {departmentPH}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {allDepartments.map(department => {
                return <Dropdown.Item key={department.id} onClick={() => { handleDepartmentClick(department.id, department.name) }}>{department.name}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </fieldset>
        <fieldset className="vertical-spacing">
          <input
            onChange={updateUser}
            type="text"
            id="title"
            className="input-field"
            placeholder="Enter your job title"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="vertical-spacing">
          <input
            onChange={updateUser}
            type="text"
            id="fullName"
            className="input-field"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="vertical-spacing">
          <input
            onChange={(event)=>{updateUser(event), setRedHighlight('')}}
            type="email"
            id="email"
            className={`input-field ${redHighlight}`}
            placeholder="Email address"
            required
          />
        </fieldset>
        <div className="vertical-spacing btn-orientation">
          <fieldset>
            <button className="login-btn" type="submit">Sign In</button>
          </fieldset>
          <fieldset>
            <button className="cancel-btn" onClick={() => { navigate("/login") }}>Cancel</button>
          </fieldset>
        </div>
      </form>
    </main>
  )
}
