import { useContext, useEffect, useState } from "react"
import { Dropdown, Button } from "react-bootstrap"
import { getAllDepartments } from "../../services/departmentService"
import { UserContext } from "../../contexts/UserIdContext"
import { getProfileById } from "../../services/userService"
import "./CreateDoc.css"

export const CreateDoc = () => {
    const { userId } = useContext(UserContext)
    const [profileInfo, setProfileInfo] = useState({})
    const [allDepartments, setAllDepartments] = useState([])
    const [departmentPH, setDepartmentPH] = useState('Departments')
    const [document, setDocument] = useState({
        departmentId: 0,
        title: "",
        userId: 0,
        body: "",
        createdDate: 0
    })

    useEffect(() => {

        if (userId > 0) {
            getAllDepartments().then((res) => {
                setAllDepartments(res)
            })

            getProfileById(userId).then((res) => {
                setProfileInfo(res)
            })

            const copy = { ...document }
            copy.userId = userId
            copy.createdDate = Math.floor(Date.now() / 1000)

            setDocument(copy)
        }
    }, [userId])

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

    const handleCreate = () => {
        
    }

    return (
        <div className="doc-container">
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
                    <input type="text" placeholder="Title" id="title" onChange={handleInputChange} required />
                    <span>Created on {
                        new Date(document.createdDate * 1000).toLocaleDateString('en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }
                        )
                    }</span>
                </div>
                <h2>By {profileInfo.fullName}</h2>
                <textarea className="text-body" placeholder="Body" id="body" onChange={handleInputChange}></textarea>
                <Button onClick={handleCreate} className="btn btn-success">Create Document</Button>
            </div>
        </div>
    )
}