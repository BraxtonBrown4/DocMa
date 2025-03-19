import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../customReact/contexts/UserIdContext"
import { getDocById } from "../../services/docsService"
import { getAllDepartments } from "../../services/departmentService"
import "./EditDoc.css"

export const EditDoc = () => {
    const { userId } = useContext(UserContext)
    const { docId } = useParams()
    const [docInfo, setDocInfo] = useState({})
    const [allDepartments, setAllDepartments] = useState([])

    useEffect(() => {
        getDocById(docId).then((res) => {
            setDocInfo(res)
        })

        getAllDepartments().then((res) => {
            setAllDepartments(res)
        })
    }, [docId])


    return (
        <form className="edit-doc-container">
            <div className="document-info">
                <div>{docInfo?.department?.name}</div>
                <div>
                    <div>{docInfo.title}</div>
                    <input type="text" />
                    <div>Created On {new Date(docInfo.createdDate * 1000).toLocaleDateString('en-US',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }
                    )}</div>
                </div>
                <div>{docInfo.body}</div>

            </div>
        </form>
    )
}

