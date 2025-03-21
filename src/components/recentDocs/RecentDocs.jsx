import { useContext, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"
import { Doc } from "../Doc/Doc"
import "./RecentDocs.css"

export const RecentDocs = () => {
    const [recentDocs, setRecentDocs] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)
    const [noDocMsg, setNoDocMsg] = useState('')

    return (
        <div className="recentDocs-container">
            <header >recent Docs</header>
            <h1 className="no-doc-msg">{noDocMsg}</h1>
            {recentDocs.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}