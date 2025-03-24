import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"
import { getUserById } from "../../services/userService"
import { useNavigate } from "react-router-dom"
import "./EditProfile.css"

export const EditProfile = () => {
    const { userId } = useContext(UserContext)
    const [profileInfo, setProfileInfo] = useState({})
    const [numDaysEmployed, setNumDaysEmployed] = useState(0)
    const [employmentDate, setEmploymentDate] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId).then((res) => {
            setProfileInfo(res)
        })
    }, [userId])

    useEffect(() => {
        if (profileInfo.employmentDate > 0) {

            const currentUnixTime = Math.floor(Date.now() / 1000)
            const unixTimeEmployed = currentUnixTime - profileInfo.employmentDate

            setNumDaysEmployed(Math.floor(unixTimeEmployed / 86400))

            const dateEmployeed = new Date(profileInfo.employmentDate * 1000)
            const dateToLocaleString = dateEmployeed.toLocaleDateString('en-US',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
            )
            setEmploymentDate(dateToLocaleString)
        }
    }, [profileInfo])
    return (
        <div className="edit-profile-container">
            <form className="edit-profile-form">
                <h1>{profileInfo.fullName}</h1>
                <h2>Department: {profileInfo.department?.name}</h2>
                <h2>Title: {profileInfo.title}</h2>
                <h2>Documents created: {profileInfo.documents?.length}</h2>
                <div className="date-info">
                    <h2>Employed on {employmentDate}</h2>
                    <span>Employed {numDaysEmployed} days</span>
                </div>
                <div className="save-and-cancel">
                    <button className="btn btn-success" type="submit">Save</button>
                    <button className="btn btn-danger" onClick={() => { navigate(`/profile/${userId}`) }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}