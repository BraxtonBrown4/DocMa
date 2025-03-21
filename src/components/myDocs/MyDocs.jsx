import { useContext, useEffect, useState } from "react"
import { deleteDocById, getDocsByUserId } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserContext"
import { Doc } from "../Doc/Doc"
import "./MyDocs.css"

export const MyDocs = () => {
    const [myDocs, setMyDocs] = useState([])
    const [deleteId, setDeleteId] = useState(0)
    const { userId } = useContext(UserContext)
    const [noDocMsg, setNoDocMsg] = useState('')

    const handleRender = () => {
        getDocsByUserId(userId).then((res) => {
            if (res.length > 0) {
                setMyDocs(res)
            } else {
                setMyDocs([])
                setNoDocMsg("There are no created documents. You should go make some!")
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
        <div className="myDocs-container">
            <header >My Docs</header>
            <h1 className="no-doc-msg">{noDocMsg}</h1>
            {myDocs.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo} setDeleteId={setDeleteId} deleteId={deleteId} />
            })}
        </div>
    )
}