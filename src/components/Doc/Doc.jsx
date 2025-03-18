import { Link } from "react-router-dom"
import "./Doc.css"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserIdContext"
import { Dropdown } from "react-bootstrap"

export const Doc = ({ docInfo }) => {
    const [bodyPreview, setBodyPreview] = useState("")
    const { userId } = useContext(UserContext)

    useEffect(() => {
        const preview = docInfo.body.slice(0, 75) + "..."
        setBodyPreview(preview)
    }, [docInfo])

    return (
        <div className="doc-info">
            <div className="department-div">
                {/* if favortie, icon goes here */}
                <h2>{docInfo.department.name}</h2>
                {
                    docInfo.userId === userId &&
                    <Dropdown>
                        <Dropdown.Toggle></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/edit-doc/${docInfo.id}`}>Edit</Dropdown.Item>
                            <Dropdown.Item >Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </div>
            <h1>{docInfo.title}</h1>
            <Link to={`/profile/${docInfo.userId}`}>{docInfo.user.fullName}</Link>
            <h3>{bodyPreview}</h3>
        </div>
    )
}