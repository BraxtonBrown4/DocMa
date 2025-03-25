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
    const [menuOpen, setMenueOpen] = useState(false)

    const handleLogout = () => {
        localStorage.getItem("docma_user") && localStorage.removeItem("docma_user")
        navigate("/", { replace: true })
    }

    return (
        <>
            <div className="navBar" id="navbar">

                <button id="navbar" className="hamburger-btn" onClick={() => { setMenueOpen(!menuOpen) }}> &#9776; </button>

                <div id="navbar" className={`menu ${menuOpen && 'open'}`}>
                    <div className="menu-list">
                        <div className="arrows">
                            <button className="menu-item bi bi-arrow-left" onClick={() => { navigate(-1) }}></button>
                            <button className="menu-item bi bi-arrow-right" onClick={() => { navigate(+1) }}></button>
                        </div>

                        <Link className="menu-item" to={`/my-docs`}>My Docs</Link>
                        <Link className="menu-item" to={`/all-docs`}>All Docs</Link>
                        <Link className="menu-item" to={`/favorites`}>Favorite Docs</Link>
                        <Link className="menu-item" to={`/recent-docs`}>Recent Docs</Link>
                        <Link className="menu-item" to={`/profile/${userId}`}>View Profile</Link>

                        <button className="menu-item" onClick={handleLogout}>Logout</button>

                        <Form className="menu-item switch">
                            <Form.Check type="switch" label={lightMode ? "Dark Mode" : "Light Mode"} checked={lightMode || false} onChange={() => { setLightMode(!lightMode) }}></Form.Check>
                        </Form>
                    </div>
                </div>

                <div className="img-container">
                    <img src="../../../assets/DocMaLogo.jpeg" alt="DocMa Logo"></img>
                </div>

            </div>
            <div className="spacing"></div>
        </>

    )
}