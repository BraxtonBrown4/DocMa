import { useContext, useEffect, useState } from "react"
import { deleteDocById, getDocsByUserId } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserIdContext"
import { Doc } from "../Doc/Doc"
import "./MyDocs.css"

export const MyDocs = () => {
    const [myDocs, setMyDocs] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)

    useEffect(() => {
        if (userId > 0) {
            getDocsByUserId(userId).then((res) => {
                setMyDocs(res)
            })
        }
    }, [userId])

    useEffect(() => {
        if (deleteId > 0) {
            deleteDocById(deleteId).then(() => {
                getDocsByUserId(userId).then((res) => {
                    setMyDocs(res)
                })
            })
        }
    }, [userId, deleteId])

    return (
        <div className="myDocs-container">
            <header>My Docs</header>
            {myDocs.length === 0 ? <h1>Wow! Looks like you have made no documents, you should make some!</h1> : myDocs.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}