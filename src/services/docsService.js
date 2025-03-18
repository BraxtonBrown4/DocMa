import { unfavoriteById } from "./favoritesServices"

export const getDocsByUserId = (id) => {
    return fetch(`http://localhost:8088/documents?userId=${id}&_expand=department&_expand=user`).then((res) => res.json())
}

export const deleteDocById = (docId) => {
    return fetch(`http://localhost:8088/userDocFavorites?documentId=${docId}`)
    .then((res)=> res.json())
    .then((favorites) => {
        const deletePromises = favorites.map(favorite => {
            unfavoriteById(favorite.id)
        })
        return Promise.all(deletePromises)
    })
    .then(fetch(`http://localhost:8088/documents/${docId}`, { method: "DELETE" }))
}