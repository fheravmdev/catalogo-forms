import instance from "../axios-instance";


export async function getUsers(admin) {
    try {
        const response = await instance.get(`/users${admin? "/details" : ""}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}


export async function removeUserRole(idUser, role) {
    return instance.delete(`/users/${idUser}/role`, { data: { role } });
}


export async function addUserRole(idUser, role) {
    return instance.post(`/users/${idUser}/role`, { role });
}


export async function removeUserFileAccess(idUser, idArchivo) {
    return instance.delete(`/users/${idUser}/file`, { data: { idArchivo } });
}

export async function createUser({ username, password, roles }) {
    try {
        const res = await instance.post("/users", { username, password, roles });
        return res.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

