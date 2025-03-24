import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { getUserById, updateUser } from "../../../services/userService"
import "./useLightMode.css"

export const useLightMode = () => {
    const { userId } = useContext(UserContext)
    const [lightMode, setLightMode] = useState(false)

    useEffect(() => {
        if (userId > 0) {
            getUserById(userId).then((res) => {
                setLightMode(res.isDarkMode)
            })
        }
    }, [userId])

    useEffect(() => {
        if (userId > 0) {
            updateUser({ id: userId, isDarkMode: lightMode })

            const html = document.documentElement
            html.className = lightMode ? "dark-mode" : "light-mode"
        }
    }, [lightMode])

    return [lightMode, setLightMode]
}