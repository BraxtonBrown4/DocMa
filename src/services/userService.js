export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserById = (Id) => {
  return fetch(`http://localhost:8088/users/${Id}?_expand=department&_embed=documents`).then((res) =>
    res.json()
  )
}

export const updateUser = (updatedProfile) => {
  return fetch(`http://localhost:8088/users/${updatedProfile.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProfile),
  }).then((res) => res.json())
}