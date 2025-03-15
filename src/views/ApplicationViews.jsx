import { Route, Routes, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localDocMaUser = localStorage.getItem("docma_user")
        const docMaUserObject = JSON.parse(localDocMaUser)

        setCurrentUser(docMaUserObject)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<><NavBar currentUser={currentUser}/> <Outlet /></>}>
                {/* <Route path="/my-docs" element={<MyDocs />}></Route> */}
                {/* <Route path="/favorites" element={<Favorites />}></Route> */}
                {/* <Route path="/all-docs" element={<AllDocs />}></Route> */}
                {/* <Route path="/create-doc" element={<CreateDoc />}></Route> */}
                {/* <Route path="/profile/:id" element={<Profile />}></Route> */}
            </Route>
        </Routes>
    )
}