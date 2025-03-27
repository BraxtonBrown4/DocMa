import { useNavigate, Link } from "react-router-dom"
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"
import { getAllDepartments } from "../../services/departmentService"
import { SearchContext } from "../../customReact/contexts/SearchContext"
import { CustomColors } from "../customColors/CustomColors"

export const NavBar = () => {
    const { setSearchObj } = useContext(SearchContext)
    const [allDepartments, setAllDepartments] = useState([])
    const [departmentPH, setDepartmentPH] = useState('All Departments')
    const { userId } = useContext(UserContext)
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)
    const [search, setSearch] = useState({
        str: '',
        depId: 0
    })

    const handleLogout = () => {
        localStorage.getItem("docma_user") && localStorage.removeItem("docma_user")
        navigate("/", { replace: true })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const copy = { ...search }
            copy.str = event.target.value

            setSearch(copy)
        }
    };

    const handleDepartmentClick = (depId, depName) => {
        const copy = { ...search }
        copy.depId = depId

        setSearch(copy)
        setDepartmentPH(depName)
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

    useEffect(() => {
        setSearchObj(search)
    }, [search])

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
                        <Link className="menu-item" to={`/create-doc`}>Create Doc</Link>
                        <Link className="menu-item" to={`/profile/${userId}`}>View Profile</Link>


                        <button className="menu-item" onClick={handleLogout}>Logout</button>

                        <CustomColors setMenuOpen={setMenuOpen}/>
                    </div>
                </div>

                {
                    (window.location.pathname === "/" || window.location.pathname.includes("docs")) &&
                    <div className="input-div">
                        <i className="bi bi-info-circle info-icon" onClick={() => { setInfoOpen(!infoOpen) }}>
                            {
                                infoOpen &&
                                <ul className="info-sheet">
                                    <li>To cross search, use forward slashes /</li>
                                    <li>Author/Title/Body</li>
                                    <li>Individual searches</li>
                                    <li>Author</li>
                                    <li>/Title</li>
                                    <li>//Body</li>
                                </ul>
                            }
                        </i>

                        <input type="text" onKeyDown={handleKeyDown} placeholder="Filter Documents"/>

                        <Dropdown>
                            <Dropdown.Toggle className="custom-dropdown">
                                {departmentPH}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item key={0} onClick={() => { handleDepartmentClick(0, "All Departments") }}>All Departments</Dropdown.Item>
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