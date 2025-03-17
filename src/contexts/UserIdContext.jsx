import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        const localDocMaUser = localStorage.getItem("docma_user")
        const docMaUserObject = JSON.parse(localDocMaUser)

        setUserId(docMaUserObject.id)
    }, [])

    return (
    <UserContext.Provider value={{ userId }}>
        {children}
    </UserContext.Provider>
        )
}