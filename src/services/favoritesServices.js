export const isFavorite = (userId, docId) => {
    return fetch(`http://localhost:8088/userDocFavorites?userId=${userId}&documentId=${docId}`).then((res) => res.json())
}

export const unfavoriteById = (docId) => {
    return fetch(`http://localhost:8088/userDocFavorites/${docId}`, { method: "DELETE" })
}

export const favoriteByIds = (userId, docId) => {
    return fetch(`http://localhost:8088/userDocFavorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: userId, documentId: docId})
    })
}