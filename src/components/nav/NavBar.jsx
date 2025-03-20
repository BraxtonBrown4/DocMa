import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, Form } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserIdContext"
import { getProfileById } from "../../services/userService"

export const NavBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const {userId} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        getProfileById(userId).then((res) => {
            setIsDarkMode(res.isDarkMode)
        })
    }, [userId])

    const handleChange = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div className="navBar">

            <Dropdown>
                <Dropdown.Toggle className="dropdown-size">Documents</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/my-docs`}>My Docs</Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/all-docs`}>All Docs</Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/favorites`}>Favorite Docs</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div className="nav-btn">
                <Link to="/create-doc">Create Doc</Link>
            </div>

            <Dropdown>
                <Dropdown.Toggle className="dropdown-size">Profile</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/profile/${userId}`}>View Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => {localStorage.getItem("docma_user") && localStorage.removeItem("docma_user"), navigate("/", { replace: true })}}>Logout</Dropdown.Item>
                    <Form>
                        <Form.Check type="switch" label={isDarkMode ? "Dark Mode" : "Light Mode"} checked={isDarkMode} onChange={handleChange}></Form.Check>
                    </Form>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}