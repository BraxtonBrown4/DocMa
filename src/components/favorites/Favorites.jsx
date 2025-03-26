import { useContext, useEffect, useState } from "react"
import { deleteDocById, getFavoritesByUserId,  } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserContext"
import { Doc } from "../Doc/Doc"
import "./Favorites.css"
import { SearchContext } from "../../customReact/contexts/SearchContext"

export const Favorites = () => {
    const [favorites, setFavorites] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)
    const [noDocMsg, setNoDocMsg] = useState('')
    const { searchFilter } = useContext(SearchContext)

    useEffect(() => {
        if (userId > 0) {
            getFavoritesByUserId(userId).then((res) => {
                if (res.length > 0) {
                    setFavorites(res)
                } else {
                    setNoDocMsg("You have no favorites. You should go find some documents and favorite them!")
                }
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
            <header>Favorites</header>
            <h1 className="no-doc-msg">{noDocMsg}</h1>
            {searchFilter(favorites).map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}