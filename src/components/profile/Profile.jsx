import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getUserById } from "../../services/userService"
import { UserContext } from "../../customReact/contexts/UserContext"
import "./Profile.css"

export const Profile = () => {
    const { userId } = useContext(UserContext)
    const { profileId } = useParams()
    const [profileInfo, setProfileInfo] = useState({})
    const [numDaysEmployed, setNumDaysEmployed] = useState(0)
    const [employmentDate, setEmploymentDate] = useState(0)

    useEffect(() => {
        getUserById(profileId).then((res) => {
            setProfileInfo(res)
        })
    }, [profileId])

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
        profileInfo.id > 0 &&
        <div className="profile-container">
            <div className="profile-info">
                <h1>{profileInfo.fullName}</h1>
                <h2>Department: {profileInfo.department?.name}</h2>
                <h2>Title: {profileInfo.title}</h2>
                <h2>Documents created: {profileInfo.documents?.length}</h2>
                <div className="date-info">
                    <h2>Employed on {employmentDate}</h2>
                    <span>Employed {numDaysEmployed} days</span>
                </div>
                {
                    userId == profileId &&
                    <Link to="/edit-profile" className="btn btn-lg btn-primary">Edit</Link>
                }
            </div>
        </div>
    )
}