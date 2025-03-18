import { Link } from "react-router-dom"
import "./Doc.css"
import { useEffect, useState } from "react"

export const Doc = ({docInfo}) => {
    const [bodyPreview, setBodyPreview] = useState("")

    useEffect(()=>{
        const preview = docInfo.body.slice(0, 75) + "..."
        setBodyPreview(preview)
    }, [docInfo])

    return (
        <div className="doc-info">
            <div>
                {/* if favortie, icon goes here */}
                <h2>{docInfo.department.name}</h2>
                {/* if it is your doc options button goes here */}
                </div>
                <h1>{docInfo.title}</h1>
                <Link to={`/profile/${docInfo.userId}`}>{docInfo.user.fullName}</Link>
                <h3>{bodyPreview}</h3>
        </div>
    )
}