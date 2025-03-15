import { Route, Routes, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    
        useEffect(() => {
            const localDocMaUser = localStorage.getItem("docma_user")
            const docMaUserObject = JSON.parse(localDocMaUser)
    
            setCurrentUser(docMaUserObject)
        }, [])

    return (
        <Routes>
            <Route path="/" element={<><NavBar /> <Outlet /></>}>
            </Route>
        </Routes>
    )
}