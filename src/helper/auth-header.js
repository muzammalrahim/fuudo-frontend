export const authHeader = () => {
    const adminToken = `Bearer ${JSON.parse(localStorage.getItem("adminToken"))}`;
    if (adminToken) {
      return { Authorization: adminToken };
    }
  
    return {};
};
  
export const subAdminAuthHeader = () => {
    const subAdminToken = `Bearer ${JSON.parse(localStorage.getItem("subAdminToken"))}`;
    if (subAdminToken) {
      return { Authorization: subAdminToken };
    }
  
    return {};
  };