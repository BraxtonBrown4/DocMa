import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserIdContext"
import { Dropdown } from "react-bootstrap"
import { HandleFavorite } from "../favoriteIcons/HandleFavorite"
import "./Doc.css"

export const Doc = ({ docInfo }) => {
    const [bodyPreview, setBodyPreview] = useState("")
    const { userId } = useContext(UserContext)
    const [icon, setUserId, setDocId] = HandleFavorite()

    useEffect(() => {
        const preview = docInfo.body.slice(0, 75) + "..."
        setBodyPreview(preview)
    }, [docInfo])

    useEffect(()=>{
        if (userId > 0 && docInfo !== undefined) {
            setUserId(userId)
            setDocId(docInfo.id)
        }
    }, [userId, docInfo])

    return (
        <div className="doc-info">
            <div className="department-div">
                {icon}
                <h2>{docInfo.department.name}</h2>
                {
                    docInfo.userId === userId &&
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="ellipses-btn btn-light">
                            &#8942;
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/edit-doc/${docInfo.id}`}>Edit</Dropdown.Item>
                            <Dropdown.Item >Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </div>
            <h1>{docInfo.title}</h1>
            {
            userId === docInfo?.userId ?<h2>{docInfo.user.fullName}</h2> :
            <Link to={`/profile/${docInfo.userId}`}>{docInfo.user.fullName}</Link>
            }
            <h3>{bodyPreview}</h3>
        </div>
    )
}