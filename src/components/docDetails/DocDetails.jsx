import { useParams } from "react-router-dom"

export const DocDetails = () => {
    const {docId} = useParams()
    return (
        <>DOCDETAILS {docId}</>
    )
}