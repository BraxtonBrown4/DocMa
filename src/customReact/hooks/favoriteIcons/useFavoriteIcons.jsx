import { useContext, useEffect, useState } from "react"
import { favoriteByIds, isFavorite, unfavoriteById } from "../../../services/favoritesServices"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./FavoriteIcon.css"
import { UserContext } from "../../contexts/UserIdContext";


export const useFavoriteIcons = (docId) => {
    const { userId } = useContext(UserContext)
    const [icon, setIcon] = useState("")
    const [favorite, setFavorite] = useState(false)
    const [joinTableId, setJoinTableId] = useState(0)

    useEffect(() => {
        if (userId > 0 && docId > 0) {
            isFavorite(userId, docId).then((res) => {
                setJoinTableId(res[0]?.id)
            })
        }
    }, [userId, docId, favorite])

    useEffect(() => {
        if (joinTableId > 0) {
            setIcon(<i className="bi bi-star-fill favorite" onClick={() => { unfavoriteById(joinTableId).then((res) => setFavorite(!favorite)) }}></i>)
        } else {
            setIcon(<i className="bi bi-star-fill not-favorite" onClick={() => { favoriteByIds(userId, docId).then(() => setFavorite(!favorite)) }}></i>)
        }
    }, [joinTableId])

    return icon
}