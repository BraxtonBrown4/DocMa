import { useParams } from "react-router-dom"

export const EditDoc = () => {
    const { docId } = useParams()

    return (
        <>EDITDOC {docId}</>
    )
}