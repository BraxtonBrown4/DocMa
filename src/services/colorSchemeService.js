export const getColorSchemesByUserId = (userId) => {
    return fetch(`http://localhost:8088/colorSchemes?userId=${userId}`).then((res)=> res.json())
}

export const getColorSchemeById = (colorSchemeId) => {
    return fetch(`http://localhost:8088/colorSchemes/${colorSchemeId}`).then((res)=> res.json())
}