export const getAllDepartments = () => {
    return fetch('http://localhost:8088/departments').then((res)=> res.json())
}