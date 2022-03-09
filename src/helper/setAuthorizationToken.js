
export const setAuthorizationToken = (token) => {
    localStorage.setItem("adminToken", JSON.stringify(token));
}

export const setSubAdminAuthorizationToken = (token) => {
    localStorage.setItem("subAdminToken", JSON.stringify(token));
}
