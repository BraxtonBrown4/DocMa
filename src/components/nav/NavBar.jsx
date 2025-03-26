import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Dropdown } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"
import { useLightMode } from "../../customReact/hooks/lightMode/useLightMode"
import { getAllDepartments } from "../../services/departmentService"

export const NavBar = () => {
    const [lightMode, setLightMode] = useLightMode()
    const [allDepartments, setAllDepartments] = useState([])
    const [departmentPH, setDepartmentPH] = useState('Departments')
    const { userId } = useContext(UserContext)
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)

    const getCapitals = (str) => str.match(/[A-Z]/g).join("")

    const handleLogout = () => {
        localStorage.getItem("docma_user") && localStorage.removeItem("docma_user")
        navigate("/", { replace: true })
    }

    const handleDepartmentClick = (depId, depName) => {

        setDepartmentPH(depName.length > 12 ? getCapitals(depName) : depName)
    }

    useEffect(() => {
        getAllDepartments().then((res) => {
            setAllDepartments(res)
        })
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#navbar")) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])

    return (
        <>
            <div className="navBar" id="navbar">

                <button id="navbar" className="hamburger-btn" onClick={() => { setMenuOpen(!menuOpen) }}> &#9776; </button>

                <div id="navbar" className={`menu ${menuOpen && 'open'}`}>
                    <div className="menu-list">
                        <Link className="menu-item" to={`/my-docs`}>My Docs</Link>
                        <Link className="menu-item" to={`/all-docs`}>All Docs</Link>
                        <Link className="menu-item" to={`/favorite-docs`}>Favorite Docs</Link>
                        <Link className="menu-item" to={`/recent-docs`}>Recent Docs</Link>
                        <Link className="menu-item" to={`/profile/${userId}`}>View Profile</Link>

                        <button className="menu-item" onClick={handleLogout}>Logout</button>

                        <Form className="menu-item switch">
                            <Form.Check type="switch" label={lightMode ? "Dark Mode" : "Light Mode"} checked={lightMode || false} onChange={() => { setLightMode(!lightMode) }}></Form.Check>
                        </Form>
                    </div>
                </div>

                {
                    window.location.pathname.includes("docs") &&
                    <div className="input-div">
                        <i className="bi bi-info-circle info-icon" onClick={() => {setInfoOpen(!infoOpen)}}>
                            {
                                infoOpen &&
                                <div className="info-sheet"></div>
                            }
                            </i>

                        

                        <input type="text" />
                        <Dropdown>
                            <Dropdown.Toggle className="custom-dropdown">
                                {departmentPH}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item key={0} onClick={() => { handleDepartmentClick(0, "Departments") }}>Departments</Dropdown.Item>
                                {allDepartments.map(department => {
                                    return <Dropdown.Item key={department.id} onClick={() => { handleDepartmentClick(department.id, department.name) }}>{department.name}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                }
                {
                    window.matchMedia("(min-width: 450px)").matches &&

                    <div className="img-container">
                        <img src="../../../assets/DocMaLogo.jpeg" alt="DocMa Logo"></img>
                    </div>
                }

            </div>
            <div className="spacing"></div>
        </>

    )
}