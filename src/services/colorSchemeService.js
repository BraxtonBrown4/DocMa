export const getColorSchemesByUserId = (userId) => {
    return fetch(`http://localhost:8088/colorSchemes?userId=${userId}`).then((res)=> res.json())
}

export const getColorSchemeById = (colorSchemeId) => {
    return fetch(`http://localhost:8088/colorSchemes/${colorSchemeId}`).then((res)=> res.json())
}

export const createColorScheme = (scheme) => {
    return fetch(`http://localhost:8088/colorSchemes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheme),
      }).then((res)=> res.json())
}

export const updateColorScheme = (scheme) => {
    return fetch(`http://localhost:8088/colorSchemes/${scheme.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheme),
      }).then((res)=> res.json())
}