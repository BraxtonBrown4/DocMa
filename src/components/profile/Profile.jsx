import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProfileById } from "../../services/userService"
import "./Profile.css"

export const Profile = () => {
    const { profileId } = useParams()
    const [profileInfo, setProfileInfo] = useState({})
    const [numDaysEmployed, setNumDaysEmployed] = useState(0)
    const [employmentDate, setEmploymentDate] = useState(0)

    useEffect(() => {
        getProfileById(profileId).then((res) => {
            setProfileInfo(res[0])
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
        <div className="profile-container">
            <div className="profile-info">
                <h1>{profileInfo.fullName}</h1>
                <h2>Department: {profileInfo.department?.name}</h2>
                <h2>Title: {profileInfo.title}</h2>
                <h2>Documents created: {profileInfo.documents?.length}</h2>
                <h2>Empolyed on {employmentDate}</h2>
                <h2>Employed {numDaysEmployed} days</h2>
            </div>
        </div>
    )
}