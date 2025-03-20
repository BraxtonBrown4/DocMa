import { createContext, useEffect, useState } from "react";
import { getProfileById, updateProfile } from "../../services/userService";

export const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)
    const [lightMode, setLightMode] = useState(false)

    useEffect(() => {
        const localDocMaUser = localStorage.getItem("docma_user")
        const docMaUserObject = JSON.parse(localDocMaUser)

        setUserId(docMaUserObject.id)
        getProfileById(docMaUserObject.id).then((res) => {
            setLightMode(res.isDarkMode)
        })
    }, [])

    useEffect(() => {
        if (userId > 0) {
            updateProfile({ id: userId, isDarkMode: lightMode })
        }
    }, [lightMode])

    return (
        <UserContext.Provider value={{ userId, lightMode, setLightMode }}>
            {children}
        </UserContext.Provider>
    )
}