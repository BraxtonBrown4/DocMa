import { Route, Routes, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"
import { Profile } from "../components/profile/Profile"

export const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/" element={<><NavBar /> <Outlet /></>}>
                {/* <Route path="/my-docs" element={<MyDocs />}></Route> */}
                {/* <Route path="/favorites" element={<Favorites />}></Route> */}
                {/* <Route path="/all-docs" element={<AllDocs />}></Route> */}
                {/* <Route path="/create-doc" element={<CreateDoc />}></Route> */}
                <Route path="/profile/:id" element={<Profile />}></Route>
            </Route>
        </Routes>
    )
}