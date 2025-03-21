import { useNavigate, Link, useRouteError } from "react-router-dom"
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, Form } from "react-bootstrap"
import { useContext } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"

export const NavBar = () => {
    const { userId, lightMode, setLightMode } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.getItem("docma_user") && localStorage.removeItem("docma_user")
        navigate("/", { replace: true })
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
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    <Form>
                        <Form.Check type="switch" label={lightMode ? "Dark Mode" : "Light Mode"} checked={lightMode} onChange={() => {setLightMode(!lightMode)}}></Form.Check>
                    </Form>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}