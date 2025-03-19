import { useContext, useEffect, useState } from "react"
import { deleteDocById, getFavoritesByUserId,  } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserIdContext"
import { Doc } from "../Doc/Doc"
import "./Favorites.css"

export const Favorites = () => {
    const [favorites, setFavorites] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)

    useEffect(() => {
        if (userId > 0) {
            getFavoritesByUserId(userId).then((res) => {
                setFavorites(res)
            })
        }
    }, [userId])

    useEffect(() => {
        if (deleteId > 0) {
            deleteDocById(deleteId).then(() => {
                getFavoritesByUserId(userId).then((res) => {
                    setFavorites(res)
                })
            })
        }
    }, [userId, deleteId])

    return (
        <div className="favorites-container">
            {favorites.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}