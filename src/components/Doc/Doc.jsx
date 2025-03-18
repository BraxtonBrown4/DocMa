import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserIdContext"
import { Dropdown } from "react-bootstrap"
import { HandleFavorite } from "../favoriteIcons/HandleFavorite"
import "./Doc.css"
import { deleteDocById } from "../../services/docsService"

export const Doc = ({ docInfo, setUpdateSignal, updateSignal }) => {
    const [bodyPreview, setBodyPreview] = useState("")
    const { userId } = useContext(UserContext)
    const [icon, setUserId, setDocId] = HandleFavorite()

    useEffect(() => {
        const preview = docInfo.body.slice(0, 75) + "..."
        setBodyPreview(preview)
        
        if (userId > 0 && docInfo !== undefined) {
            setUserId(userId)
            setDocId(docInfo.id)
            
        }
    }, [docInfo, userId])

    useEffect(() => {
        setUpdateSignal(!updateSignal)
    }, [icon])

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
                            <Dropdown.Item onClick={()=>{deleteDocById(docInfo.id), setUpdateSignal(!updateSignal)}} >Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </div>
            <div className="title-div">
                <h1 className="title">{docInfo.title}</h1>
            </div>
            <div className="author-div">
                {
                    userId === docInfo?.userId ? <h2 className="author">{docInfo.user.fullName}</h2> :
                        <Link className="author" to={`/profile/${docInfo.userId}`}>{docInfo.user.fullName}</Link>
                }
            </div>
            <Link to={`/doc-details/${docInfo.id}`} >{bodyPreview}</Link>
        </div>
    )
}