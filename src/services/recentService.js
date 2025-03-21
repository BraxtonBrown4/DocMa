const isRecent = (userId, docId) => {
    return fetch(`http://localhost:8088/userDocReads?userId=${userId}&documentId=${docId}`).then((res) => res.json())
}

const deleteRecentByObjId = (id) => {
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
            documentId: docId,
            readDate: Math.floor(Date.now() / 1000)
        })
    }).then((res) => res.json())
}

export const handleRecent = (userId, docId) => {
    return isRecent(userId, docId).then((res) => {
        if (res.length > 0) {
            deleteRecentByObjId(res[0].id).then(() => {
                createRecent(userId, docId)
            })
        } else {
            createRecent(userId, docId).then(() => {
                getAllRecentsByUserId(userId).then((recents) => {
                    if (recents.length > 10) {
                        const smallestTime = recentsobjects.reduce((lowest, current) => {
                            return current.readDate < lowest.readDate ? current : lowest;
                            
                        })

                        return Promise.all(smallestTime)
                    }
                }).then((leastRecent) => {
                    return deleteRecentByObjId(leastRecent.id)
                })
            })
        }
    })
}
