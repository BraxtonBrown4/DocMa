const isRecent = (userId, docId) => {
    return fetch(`http://localhost:8088/userDocReads?userId=${userId}&documentId=${docId}`).then((res) => res.json())
}

export const deleteRecentById = (id) => {
    return fetch(`http://localhost:8088/userDocReads/${id}`, { method: "DELETE" }).then((res) => res.json())
}

export const getAllRecentsByUserId = (userId) => {
    return fetch(`http://localhost:8088/userDocReads?userId=${userId}`).then((res) => res.json())
}

const createRecent = (userId, docId) => {
    return fetch('http://localhost:8088/userDocReads', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            documentId: parseInt(docId),
            readDate: Math.floor(Date.now() / 1000)
        })
    }).then((res) => res.json())
}

export const handleRecent = (userId, docId) => {
    return isRecent(userId, docId).then((res) => {
        if (res.length > 0) {
            deleteRecentById(res[0].id).then(() => {
                createRecent(userId, docId)
            })
        } else {
            createRecent(userId, docId).then(() => {
                getAllRecentsByUserId(userId).then((recents) => {
                    if (recents.length > 9) {
                        const smallestTime = recents.reduce((lowest, current) => {
                            return current.readDate < lowest.readDate ? current : lowest;
                        }, recents[0]);

                        if (smallestTime.id > 0) {
                            deleteRecentById(smallestTime.id)
                        }
                    }
                })
            })
        }
    })
}