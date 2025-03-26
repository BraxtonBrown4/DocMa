import { useContext, useEffect, useState } from "react"
import { deleteDocById, getAllDocs } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserContext"
import { Doc } from "../Doc/Doc"
import "./AllDocs.css"
import { SearchContext } from "../../customReact/contexts/SearchContext"

export const AllDocs = () => {
    const [allDocs, setAllDocs] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)
    const { searchFilter } = useContext(SearchContext)
    const [noDocMsg, setNoDocMsg] = useState('')

    const handleRender = () => {
        getAllDocs().then((res) => {
            if (res.length > 0) {
                setAllDocs(res)
            } else {
                setAllDocs([])
                setNoDocMsg("There are no created documents. You should go make some!")
            }
        })
    }

    useEffect(() => {
        handleRender()
    }, [])

    useEffect(() => {
        if (deleteId > 0) {
            deleteDocById(deleteId).then(() => {
               handleRender()
            })
        }
    }, [userId, deleteId])

    return (
        <div className="allDocs-container">
            <header >All Docs</header>
            <h1 className="no-doc-msg">{noDocMsg}</h1>
            {searchFilter(allDocs).map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}