import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown } from "react-bootstrap"

export const NavBar = () => {
    const navigate = useNavigate()
// My Docs, Favorites, Create Doc, All Docs
    return (
        <div className="navBar">
            <div className="nav-btn">
                <Link to="/my-docs">My Docs</Link>
            </div>
            <div className="nav-btn">
                <Link to="/all-docs">All Docs</Link>
            </div>
            <div className="nav-btn">
                <Link to="/favorites">Favorites</Link>
            </div>
            <div className="nav-btn">
                <Link to="/create-doc">Create Doc</Link>
            </div>
            <Dropdown className="dropdown-positioning">
                <Dropdown.Toggle className="dropdown-size">Profile</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => {localStorage.getItem("docma_user") && localStorage.removeItem("docma_user"), navigate("/", { replace: true })}}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}