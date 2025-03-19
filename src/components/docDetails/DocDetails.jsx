import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteDocById, getDocById } from "../../services/docsService"
import { UserContext } from "../../customReact/contexts/UserIdContext"
import { Dropdown } from "react-bootstrap"
import { useFavoriteIcons } from "../../customReact/hooks/favoriteIcons/useFavoriteIcons"
import "./DocDetails.css"

export const DocDetails = () => {
    const { userId } = useContext(UserContext)
    const { docId } = useParams()
    const [docInfo, setDocInfo] = useState({})
    const icon = useFavoriteIcons(parseInt(docId))
    const navigate = useNavigate()

    useEffect(() => {
        getDocById(docId).then((res) => {
            setDocInfo(res)
        })
    }, [docId, userId])

    return (
        <div className="dd-container">
            <div className="dd-info">
                <div className="dd-department-div">
                    {icon}
                    <h2>{docInfo?.department?.name}</h2>
                    {userId == docInfo.userId &&
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="dd-ellipses-btn btn-light">
                                &#8942;
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/edit-doc/${docInfo.id}`}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {deleteDocById(docId).then(()=> {navigate(-1)})}} >Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>
                <div className="dd-title-div">
                    <h1 className="title">{docInfo.title}</h1>
                </div>
                <div className="dd-author-div">
                    {
                        userId === docInfo?.userId ? <h2 className="author">{docInfo.user.fullName}</h2> :
                            <Link className="author" to={`/profile/${docInfo.userId}`}>{docInfo?.user?.fullName}</Link>
                    }
                </div>
                <div className="dd-body-div">
                    <h2 className="body">{docInfo.body}</h2>
                </div>
            </div>

        </div>
    )
}