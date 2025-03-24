import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../customReact/contexts/UserContext"
import { getUserById, updateUser } from "../../services/userService"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown } from "react-bootstrap"
import { getAllDepartments } from "../../services/departmentService"
import "./EditProfile.css"

export const EditProfile = () => {
    const { userId } = useContext(UserContext)
    const [profileInfo, setProfileInfo] = useState({})
    const [numDaysEmployed, setNumDaysEmployed] = useState(0)
    const [employmentDate, setEmploymentDate] = useState(0)
    const [allDepartments, setAllDepartments] = useState([])
    const [departmentPH, setDepartmentPH] = useState('')
    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        id: 0,
        fullName: "",
        title: "",
        departmentId: 0
    })

    useEffect(() => {
        getUserById(userId).then((res) => {
            setProfileInfo(res)
        })

        getAllDepartments().then((res) => {
            setAllDepartments(res)
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

            setProfile({
                id: userId,
                fullName: profileInfo.fullName,
                title: profileInfo.title,
                departmentId: profileInfo.departmentId
            })

            setDepartmentPH(profileInfo.department.name)
        }
    }, [profileInfo])

    const handleInputChange = (event) => {
        const copy = { ...profile }
        copy[event.target.id] = event.target.value
        setProfile(copy)
    }

    const handleDepartmentClick = (depId, depName) => {
        const copy = { ...profile }
        copy.departmentId = depId

        setProfile(copy)
        setDepartmentPH(depName)
    }

    const handleSave = (e) => {
        e.preventDefault()
        
        updateUser(profile).then(() => {
            navigate(`/profile/${userId}`)
        })
    }

    return (
        <div className="edit-profile-container">
            <form className="edit-profile-form" onSubmit={handleSave}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Full Name</span>
                    </div>
                    <input type="text" className="form-control" value={profile.fullName} id="fullName" onChange={handleInputChange} required />
                </div>

                <Dropdown className="departments-dropdown">
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle">
                        {departmentPH}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {allDepartments.map(department => {
                            return <Dropdown.Item key={department.id} onClick={() => { handleDepartmentClick(department.id, department.name) }}>{department.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Title</span>
                    </div>
                    <input type="text" className="form-control" value={profile.title} id="title" onChange={handleInputChange} required />
                </div>

                <h2>Documents created: {profileInfo.documents?.length}</h2>
                <div className="date-info">
                    <h2>Employed on {employmentDate}</h2>
                    <span>Employed {numDaysEmployed} days</span>
                </div>
                <div className="save-and-cancel">
                    <button className="btn btn-success btn-size" type="submit">Save</button>
                    <Link className="btn btn-danger btn-size" to={`/profile/${userId}`}>Cancel</Link>
                </div>
            </form>
        </div>
    )
}