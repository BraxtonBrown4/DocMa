import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDocById, updateDocument } from "../../services/docsService"
import { getAllDepartments } from "../../services/departmentService"
import { Button, Dropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./EditDoc.css"

export const EditDoc = () => {
    const { docId } = useParams()
    const [docInfo, setDocInfo] = useState({})
    const [allDepartments, setAllDepartments] = useState([])
    const [departmentPH, setDepartmentPH] = useState('')
    const navigate = useNavigate()
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

        getAllDepartments().then((res) => {
            setAllDepartments(res)
        })
    }, [docId])

    useEffect(() => {
        if (docInfo.id > 0) {
            const copy = { ...document }
            copy.id = docInfo.id
            copy.departmentId = docInfo.departmentId
            copy.title = docInfo.title
            copy.userId = docInfo.userId
            copy.body = docInfo.body
            copy.createdDate = docInfo.createdDate
            copy.editedDate = Math.floor(Date.now() / 1000)

            setDocument(copy)
            setDepartmentPH(docInfo?.department?.name)
        }
    }, [docInfo])

    const handleDepartmentClick = (depId, depName) => {
        const copy = { ...document }
        copy.departmentId = depId

        setDocument(copy)
        setDepartmentPH(depName)
    }

    const handleInputChange = (event) => {
        const copy = { ...document }
        copy[event.target.id] = event.target.value
        setDocument(copy)
    }

    const handleSave = (e) => {
        e.preventDefault()

        updateDocument(document).then((res) => {
            navigate(`/doc-details/${res.id}`)
        })
    }

    return (
        <form className="edit-doc-container" onSubmit={handleSave}>
            <div className="document-info">
                <Dropdown className="departments-dropdown">
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle">
                        {departmentPH}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {allDepartments.map(department => {
                            return <Dropdown.Item key={department.id} onClick={() => { handleDepartmentClick(department.id, department.name) }}>{department.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <div className="input-and-date">
                    <input type="text" value={document.title} id="title" onChange={handleInputChange} required />
                    <span>Created On {new Date(document.createdDate * 1000).toLocaleDateString('en-US', localeDateStringInfo)}</span>
                    <span>Edited on {new Date(document.editedDate * 1000).toLocaleDateString('en-US', localeDateStringInfo)}</span>
                </div>
                <h2>By {docInfo?.user?.fullName}</h2>
                <textarea className="text-body" value={document.body} id="body" onChange={handleInputChange}></textarea>
                <div className="btns-container">
                    <Button className="btn btn-success" type="submit">Save Document</Button>
                    <Button className="btn btn-danger" onClick={() => { navigate(-1) }}>Cancel</Button>
                </div>

            </div>
        </form>
    )
}

