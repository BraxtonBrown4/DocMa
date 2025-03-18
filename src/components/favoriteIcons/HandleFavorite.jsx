import { useEffect, useState } from "react"
import { favoriteByIds, isFavorite, unfavoriteById } from "../../services/favoritesServices"
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./FavoriteIcon.css"


export const HandleFavorite = () => {
    const [userId, setUserId] = useState(0)
    const [docId, setDocId] = useState(0)
    const [icon, setIcon] = useState("")

    useEffect(()=> {
        if (userId > 0 && docId > 0) {
            isFavorite(userId, docId).then((res) => {
                if (res[0]?.id > 0) {
                    setIcon(<i className="bi bi-star-fill favorite" onClick={()=>{unfavoriteById(res[0].id)}}></i>)
                } else {
                    setIcon(<i className="bi bi-star-fill not-favorite" onClick={()=>{favoriteByIds(userId, docId)}}></i>)
                }                
            })
        }

    }, [userId, docId])

    return [ icon, setUserId, setDocId]
}