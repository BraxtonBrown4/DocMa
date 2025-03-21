import { unfavoriteById } from "./favoritesServices"
import { deleteRecentById } from "./recentService"

export const getDocsByUserId = (id) => {
    return fetch(`http://localhost:8088/documents?userId=${id}&_expand=department&_expand=user`).then((res) => res.json())
}

export const deleteDocById = (docId) => {
    return fetch(`http://localhost:8088/userDocFavorites?documentId=${docId}`)
        .then((res) => res.json())
        .then((favorites) => {
            const deletePromises = favorites.map(favorite =>
                unfavoriteById(favorite.id)
            )
            return Promise.all(deletePromises)
        })
        .then(() => {
            return fetch(`http://localhost:8088/userDocReads?documentId=${docId}`)
            .then((res) => res.json())
            .then((recents) => {
                const deletePromises = recents.map(recent =>
                    deleteRecentById(recent.id)
                )
                return Promise.all(deletePromises)
            })
        })
        .then(() => { return fetch(`http://localhost:8088/documents/${docId}`, { method: "DELETE" }) })
}

export const createDocument = (document) => {
    return fetch(`http://localhost:8088/Documents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(document)
    }).then((res) => res.json())
}

export const getDocById = (id) => {
    return fetch(`http://localhost:8088/documents/${id}?_expand=department&_expand=user`).then((res) => res.json())
}

export const updateDocument = (document) => {
    return fetch(`http://localhost:8088/Documents/${document.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(document)
    }).then((res) => res.json())
}

export const getFavoritesByUserId = (id) => {
    return fetch(`http://localhost:8088/userDocFavorites?userId=${id}`)
        .then((res) => res.json())
        .then((res) => {
            const allFavorites = res.map((joinTable) =>
                getDocById(joinTable.documentId)
            )

            return Promise.all(allFavorites)
        })
}

export const getAllDocs = () => {
    return fetch(`http://localhost:8088/documents?_expand=department&_expand=user`).then((res) => res.json())
}
