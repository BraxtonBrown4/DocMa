import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form } from "react-bootstrap"
import { useContext, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"
import { useLightMode } from "../../customReact/hooks/lightMode/useLightMode"

export const NavBar = () => {
    const [lightMode, setLightMode] = useLightMode()
    const { userId } = useContext(UserContext)
    const navigate = useNavigate()
    const [menu, setMenue] = useState(false)

    const handleLogout = () => {
        localStorage.getItem("docma_user") && localStorage.removeItem("docma_user")
        navigate("/", { replace: true })
    }

    const handleNavMenu = () => {
        setMenue(!menu)
    }

    return (
        <div className="navBar">

            <button className="hamburger-btn" onClick={handleNavMenu}> &#9776; </button>
            
                <div className={`menu ${menu ? 'open' : 'closed'}`}>
                    <div className="menu-list">
                        <Link to={`/my-docs`}>My Docs</Link>
                        <Link to={`/all-docs`}>All Docs</Link>
                        <Link to={`/favorites`}>Favorite Docs</Link>
                        <Link to={`/recent-docs`}>Recent Docs</Link>
                        <Link to={`/profile/${userId}`}>View Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                        <Form>
                            <Form.Check type="switch" label={lightMode ? "Dark Mode" : "Light Mode"} checked={lightMode} onChange={() => { setLightMode(!lightMode) }}></Form.Check>
                        </Form>
                    </div>
                </div>

            <div className="img-container">
                <img src="../../../assets/DocMaLogo.jpeg" alt="DocMa Logo"></img>
            </div>

        </div>

    )
}