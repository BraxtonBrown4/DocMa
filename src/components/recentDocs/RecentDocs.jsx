import { useContext, useEffect, useState } from "react"
import { deleteDocById, getDocById, getDocsByUserId } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserContext"
import { Doc } from "../Doc/Doc"
import "./RecentDocs.css"
import { getAllRecentsByUserId } from "../../services/recentService"

export const RecentDocs = () => {
    const [recentDocs, setRecentDocs] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)
    const [noDocMsg, setNoDocMsg] = useState('')

    const handleRender = () => {
        getAllRecentsByUserId(userId).then((res) => {
            const allRecents = res.map((recent) => 
                getDocById(recent.documentId)
            )
            return Promise.all(allRecents)
        }).then((allRecents) => {
            if (allRecents.length > 0) {
                setRecentDocs(allRecents)
            } else {
                setRecentDocs([])
                setNoDocMsg("You have viewed no documents. You should go look at some!")
            }
        })
    }


    useEffect(() => {
        if (userId > 0) {
            handleRender()
        }
    }, [userId])

    useEffect(() => {
        if (deleteId > 0) {
            deleteDocById(deleteId).then(() => {
                handleRender()
            })
        }
    }, [userId, deleteId])

    return (
        <div className="recentDocs-container">
            <header >Recent Docs</header>
            <h1 className="no-doc-msg">{noDocMsg}</h1>
            {recentDocs.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}