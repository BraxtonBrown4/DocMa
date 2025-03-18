import { useEffect, useState } from "react"
import { favoriteByIds, isFavorite, unfavoriteById } from "../../services/favoritesServices"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./FavoriteIcon.css"


export const useFavoriteIcons = (userId, docId) => {
    const [icon, setIcon] = useState("")
    const [favorite, setFavorite] = useState(false)
    const [joinTableId, setJoinTableId] = useState(0)

    useEffect(() => {
        if (userId > 0 && docId > 0) {
            isFavorite(userId, docId).then((res) => {
                if (res[0]?.id > 0) {
                    setFavorite(true)
                    setJoinTableId(res[0]?.id)
                } else {
                    setFavorite(false)
                }
            })
        }
    }, [userId, docId])

    useEffect(() => {
        if (favorite) {
            setIcon(<i className="bi bi-star-fill favorite" onClick={() => {unfavoriteById(joinTableId).then(() => setFavorite(!favorite))}}></i>)
        } else {
            setIcon(<i className="bi bi-star-fill not-favorite" onClick={() => {favoriteByIds(userId, docId).then(() => setFavorite(!favorite))}}></i>)

        }
    }, [favorite])

    return icon
}