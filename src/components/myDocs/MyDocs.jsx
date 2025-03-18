import { useContext, useEffect, useState } from "react"
import { deleteDocById, getDocsByUserId } from "../../services/docsService"
import { UserContext } from "../../contexts/UserIdContext"
import { Doc } from "../Doc/Doc"
import "./MyDocs.css"

export const MyDocs = () => {
    const [myDocs, setMyDocs] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const {userId} = useContext(UserContext)

    useEffect(() => {
        if (userId > 0) {
            getDocsByUserId(userId).then((res) => {
                setMyDocs(res)
            })
        }

        if (deleteId > 0) {
            deleteDocById(deleteId)
        }
    }, [userId, deleteId])

    return (
        <div className="myDocs-container">
            {myDocs.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId}/>
            })}
        </div>
    )
}