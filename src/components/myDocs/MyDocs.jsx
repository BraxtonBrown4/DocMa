import { useContext, useEffect, useState } from "react"
import { getDocsByUserId } from "../../services/docsService"
import { UserContext } from "../../contexts/UserIdContext"
import { Doc } from "../Doc/Doc"
import "./MyDocs.css"

export const MyDocs = () => {
    const [myDocs, setMyDocs] = useState([])
    const {userId} = useContext(UserContext)

    useEffect(() => {
        if (userId > 0) {
            getDocsByUserId(userId).then((res) => {
                setMyDocs(res)
            })
        }
    }, [userId])

    return (
        <div className="myDocs-container">
            {myDocs.map(docInfo => {
                return <Doc key={docInfo.id} docInfo={docInfo}/>
            })}
        </div>
    )
}