import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { getUserById, updateUser } from "../../../services/userService"
import { getColorSchemeById } from "../../../services/colorSchemeService"
import "./WebPageColors.css"

export const useColorSchemes = () => {
    const { userId } = useContext(UserContext)
    const [colorScheme, setColorScheme] = useState(undefined)

    const defaultColors = {
        id: 0,
        "--primary-text": "#ffffff",
        "--webpage-background": "#475058",
        "--doc-header": "#8a959f",
        "--doc-body": "#898989",
        "--doc-links": "#ffffff",
        "--doc-border": "#000000",
        "--create-doc-background": "#e2e2e2",
        "--create-doc-text": "#000000",
        "--create-doc-border": "#000000",
        "--edit-doc-background": "#e2e2e2",
        "--edit-doc-text": "#000000",
        "--edit-doc-border": "#000000",
        "--favorited-icon-background": "#475058",
        "--favorited-icon-color": "#ffff00",
        "--not-favorited-icon-background": "#5b6670",
        "--not-favorited-icon-color": "#ffffff",
        "--profile-background": "#898989",
        "--profile-border": "#000000",
        "--profile-name-border": "#000000",
        "--profile-name-background": "#ffffff",
        "--profile-name-text": "#000000",
        "--edit-profile-background": "#898989",
        "--edit-profile-border": "#000000"
      }

    const html = document.documentElement
    html.className = "web-page-colors"

    useEffect(() => {
        if (userId > 0) {
            getUserById(userId).then((res) => {
                if (res.colorSchemeId !== 0) {
                    getColorSchemeById(res.colorSchemeId).then((colorScheme) => {
                        setColorScheme(colorScheme)
                    })
                } else {
                    setColorScheme(defaultColors)
                }
            })
        }
    }, [userId])

    useEffect(() => {
        if (userId > 0 && colorScheme !== undefined) {
            updateUser({ id: userId, colorSchemeId: colorScheme.id })

            Object.entries(colorScheme).forEach(([key, value]) => {
                if (key !== "id" && key !== "userId" && key !== "name") {
                    document.documentElement.style.setProperty(key, value);
                }
            })
        }
    }, [colorScheme])

    return [colorScheme, setColorScheme, defaultColors]
}