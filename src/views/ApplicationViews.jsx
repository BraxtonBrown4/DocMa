import { Route, Routes, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Profile } from "../components/profile/Profile"
import { CreateDoc } from "../components/createDoc/CreateDoc"
import { MyDocs } from "../components/myDocs/MyDocs"
import { DocDetails } from "../components/docDetails/DocDetails"
import { EditDoc } from "../components/editDoc/editDoc"
import { Favorites } from "../components/favorites/Favorites"
import { AllDocs } from "../components/allDocs/AllDocs"

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={<><NavBar /> <Outlet /></>}>
                <Route index element={<MyDocs />}></Route>
                <Route path="/my-docs" element={<MyDocs />}></Route>
                <Route path="/favorites" element={<Favorites />}></Route>
                <Route path="/all-docs" element={<AllDocs />}></Route>
                <Route path="/create-doc" element={<CreateDoc />}></Route>
                <Route path="/profile/:profileId" element={<Profile />}></Route>
                <Route path="/doc-details/:docId" element={<DocDetails />}></Route>
                <Route path="/edit-doc/:docId" element={<EditDoc />}></Route>
            </Route>
        </Routes>
    )
}