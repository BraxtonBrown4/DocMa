import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDocById } from "../../services/docsService"
import { getAllDepartments } from "../../services/departmentService"
import "./EditDoc.css"

export const EditDoc = () => {
    const { docId } = useParams()
    const [docInfo, setDocInfo] = useState({})
    const [document, setDocument] = useState({
        id: 0,
        departmentId: 0,
        title: "",
        userId: 0,
        body: "",
        createdDate: 0,
        editedDate: 0
    })

    const localeDateStringInfo = { year: 'numeric', month: 'long', day: 'numeric' }

    useEffect(() => {
        getDocById(docId).then((res) => {
            setDocInfo(res)
        })
    }, [docId])

    useEffect(() => {
        const copy = { ...document }
        copy.id = docInfo.id
        copy.departmentId = docInfo.departmentId
        copy.title = docInfo.title
        copy.userId = docInfo.userId
        copy.body = docInfo.body
        copy.createdDate = docInfo.createdDate
        copy.editedDate = Math.floor(Date.now() / 1000)

        setDocument(copy)
    }, [docInfo])

    const handleInputChange = (event) => {
        const copy = { ...document }
        copy[event.target.id] = event.target.value
        setDocument(copy)
    }


    return (
        <form className="edit-doc-container">
            <div className="document-info">
                <div className="input-and-date">
                    <input type="text" value={document.title} id="title" onChange={handleInputChange} required />
                    <span>Created On {new Date(document.createdDate * 1000).toLocaleDateString('en-US', localeDateStringInfo)}</span>
                    <span>Edited on {new Date(document.editedDate * 1000).toLocaleDateString('en-US', localeDateStringInfo)}</span>
                </div>
                <div>{docInfo.body}</div>

            </div>
        </form>
    )
}

