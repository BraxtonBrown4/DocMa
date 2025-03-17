import { Route, Routes, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Profile } from "../components/profile/Profile"
import { CreateDoc } from "../components/createDoc/CreateDoc"

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={<><NavBar /> <Outlet /></>}>
                {/* <Route path="/my-docs" element={<MyDocs />}></Route> */}
                {/* <Route path="/favorites" element={<Favorites />}></Route> */}
                {/* <Route path="/all-docs" element={<AllDocs />}></Route> */}
                <Route path="/create-doc" element={<CreateDoc />}></Route>
                <Route path="/profile/:profileId" element={<Profile />}></Route>
            </Route>
        </Routes>
    )
}