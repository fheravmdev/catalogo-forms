import instance from "../axios-instance";


export async function getUsers(admin) {
    try {
        const response = await instance.get(`/users${admin ? "/details" : ""}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}


export async function removeUserRole(idUser, role) {
    return instance.delete(`/users/${idUser}/role`, { data: { role } });
}


export async function addUserRole(idUser, role) {
    return instance.post(`/users/${idUser}/role`, { role });
}




export async function createUser({ username, password, rol }) {
    try {
        const res = await instance.post("/users", { username, password, roles: [rol] });
        return res.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

export async function modifyPassword(oldPass, newPass) {
    try {
        const res = await instance.post(
            "/modificarPassword",
            { oldPass: oldPass, newPass: newPass },
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        return { success: false, error: error?.response?.data?.error || error.message }
    }
}


export async function resetPassword(idUser) {
    try {
        const res = await instance.post(
            "/resetPassword",
            { idUser: idUser },
            { withCredentials: true }
        )
        return res.data
    } catch (error) {
        console.log(error);
        return { success: false, errro: error?.response?.data?.error || error.message }
    }
}