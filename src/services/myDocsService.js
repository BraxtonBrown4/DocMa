export const getDocsByUserId = (id) => {
    return fetch(`http://localhost:8088/documents?userId=${id}`).then((res) => res.json())
}