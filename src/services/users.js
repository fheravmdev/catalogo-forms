import instance from "../axios-instance";


export async function getUsers(admin) {
    try {
        const response = await instance.get(`/users${admin? "/details" : ""}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

// Remove a role from a user
export async function removeUserRole(idUser, role) {
    return instance.delete(`/users/${idUser}/role`, { data: { role } });
}

// Add a role to a user
export async function addUserRole(idUser, role) {
    return instance.post(`/users/${idUser}/role`, { role });
}

// Remove file access (all permissions) for a user
export async function removeUserFileAccess(idUser, idArchivo) {
    return instance.delete(`/users/${idUser}/file`, { data: { idArchivo } });
}

