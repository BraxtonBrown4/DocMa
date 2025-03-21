import { useContext, useEffect, useState } from "react"
import { favoriteByIds, isFavorite, unfavoriteById } from "../../../services/favoritesServices"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./FavoriteIcon.css"
import { UserContext } from "../../contexts/UserContext";


export const useFavoriteIcons = (docId) => {
    const { userId } = useContext(UserContext)
    const [favorite, setFavorite] = useState(false)
    const [joinTableId, setJoinTableId] = useState(0)

    
    useEffect(() => {
        if (userId > 0 && docId > 0) {
            isFavorite(userId, docId).then((res) => {
                if (res.length > 0) {
                    setFavorite(true)
                }
                setJoinTableId(res[0]?.id)
            })
        }
    }, [userId, docId, favorite])
    
    const handleFavorite = () => {

        if (joinTableId > 0) {
            unfavoriteById(joinTableId).then(() =>
                setFavorite(!favorite)
            )
        } else {
            favoriteByIds(userId, docId).then(() => 
                setFavorite(!favorite)
        )
        }
    }
    
    return <i className={`bi bi-star-fill ${favorite ? "favorite" : "not-favorite"}`} onClick={handleFavorite}></i>
}