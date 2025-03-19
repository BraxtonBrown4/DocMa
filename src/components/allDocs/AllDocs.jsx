import { useContext, useEffect, useState } from "react"
import { deleteDocById, getAllDocs } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserIdContext"
import { Doc } from "../Doc/Doc"
import "./AllDocs.css"

export const AllDocs = () => {
    const [allDocs, setAllDocs] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)

    useEffect(() => {
            getAllDocs().then((res) => {
                setAllDocs(res)
            })
    }, [])

    useEffect(() => {
        if (deleteId > 0) {
            deleteDocById(deleteId).then(() => {
                getAllDocs().then((res) => {
                    setAllDocs(res)
                })
            })
        }
    }, [userId, deleteId])

    return (
        <div className="allDocs-container">
            <header>All Docs</header>
            {allDocs.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}