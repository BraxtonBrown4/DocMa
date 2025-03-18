export const getDocsByUserId = (id) => {
    return fetch(`http://localhost:8088/documents?userId=${id}&_expand=department&_expand=user`).then((res) => res.json())
}