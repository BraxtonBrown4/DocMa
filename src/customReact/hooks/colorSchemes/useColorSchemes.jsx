import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { getUserById, updateUser } from "../../../services/userService"
import { getColorSchemeById } from "../../../services/colorSchemeService"
import "./WebPageColors.css"

export const useColorSchemes = () => {
    const { userId } = useContext(UserContext)
    const [colorScheme, setColorScheme] = useState(undefined)

    const html = document.documentElement
    html.className = "web-page-colors"

    useEffect(() => {
        if (userId > 0) {
            getUserById(userId).then((res) => {
                getColorSchemeById(res.colorSchemeId).then((colorScheme) => {
                    setColorScheme(colorScheme)
                })
            })
        }
    }, [userId])

    useEffect(() => {
        if (userId > 0 && colorScheme !== undefined) {
            updateUser({ id: userId, colorSchemeId: colorScheme.id })

            Object.entries(colorScheme).forEach(([key, value]) => {
                if (key !== "id" || key !== "userId" || key !== "name") {
                    document.documentElement.style.setProperty(key, value);
                }
            })
        }
    }, [colorScheme])

    return [colorScheme, setColorScheme]
}