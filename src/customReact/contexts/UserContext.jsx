import { createContext, useEffect, useState } from "react";
import { getUserById, updateUser } from "../../services/userService";

export const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)
    const [lightMode, setLightMode] = useState(false)

    useEffect(() => {
        const localDocMaUser = localStorage.getItem("docma_user")
        const docMaUserObject = JSON.parse(localDocMaUser)

        setUserId(docMaUserObject.id)
        getUserById(docMaUserObject.id).then((res) => {
            setLightMode(res.isDarkMode)
        })
    }, [])

    useEffect(() => {
        if (userId > 0) {
            updateUser({ id: userId, isDarkMode: lightMode })

            const html = document.documentElement
            html.className = lightMode ? "dark-mode" : "light-mode"
        }
    }, [lightMode])

    return (
        <UserContext.Provider value={{ userId, lightMode, setLightMode }}>
            {children}
        </UserContext.Provider>
    )
}