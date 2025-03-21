import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"
import { Dropdown } from "react-bootstrap"
import { useFavoriteIcons } from "../../customReact/hooks/favoriteIcons/useFavoriteIcons"
import "./Doc.css"

export const Doc = ({ docInfo, setDeleteId }) => {
    const [bodyPreview, setBodyPreview] = useState("")
    const { userId } = useContext(UserContext)
    const icon = useFavoriteIcons(docInfo.id)

    useEffect(() => {
        const preview = docInfo.body.slice(0, 75) + "..."
        setBodyPreview(preview)
    }, [docInfo, userId])

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
                            <Dropdown.Item onClick={() => { setDeleteId(docInfo.id) }} >Delete</Dropdown.Item>
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
            <div className="body-div">
                <Link className="body" to={`/doc-details/${docInfo.id}`} >{bodyPreview}</Link>
            </div>
        </div>
    )
}