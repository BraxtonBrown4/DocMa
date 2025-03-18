export const createDocument = (document) => {
    return fetch(`http://localhost:8088/Documents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(document)
    })
}