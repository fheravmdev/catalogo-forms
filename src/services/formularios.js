import instance from "../axios-instance";


export async function getAllForms() {
    try {
        const response = await instance.get("/formularios", { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

// Get permissions for a form
export async function getFormPermissions(idFormulario) {
    try {
        const response = await instance.get(`/formularios/${idFormulario}/permisos`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

// Share a form (add permission for a user)
export async function shareForm(idFormulario, idUser, permiso = "ver") {
    try {
        const response = await instance.post(`/formularios/${idFormulario}/compartir`, { idUser, permiso }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

// Remove a user's permission from a form
export async function removeFormPermission(idUser, idFormulario) {
    try {
        const response = await instance.post(`/formularios/permisos`, { idUser: idUser, idFormulario: idFormulario }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

// List users with access to a form
export async function getFormUsers(idFormulario) {
    try {
        const response = await instance.get(`/formularios/${idFormulario}/usuarios`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

// List forms a user has access to
export async function getUserForms(idUser) {
    try {
        const response = await instance.get(`/usuarios/${idUser}/formularios`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

// List forms the current user has access to
export async function getMyForms() {
    try {
        const response = await instance.get("/me/forms", { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

//Por si acaso lo necesito dps
async function fetchFormularios() {
    try {
        const response = await instance.get("/formularios");
        const formularios = response.data;
        return formularios;
    } catch (error) {
        console.error("Error al obtener fomularios:", error);
        throw error;
    }
}

export { fetchFormularios }

export async function createForm({ nombre, area, res_url, edit_url }) {
    try {
        const response = await instance.post(
            "/formularios",
            { nombre, area, res_url, edit_url },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}


export async function updateForm( idFormulario, nombre, area, res_url, edit_url) {
    try {
        const response = await instance.post(
            "/formularios/update",
            { idFormulario: idFormulario, nombre: nombre, area: area, res_url: res_url, edit_url: edit_url },
            { withCredentials: true }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return { succes: false, error: error?.response?.data?.error || error.message };
    }
}

export async function deletePermisoForm(idPermiso){
    try {
        const response = await instance.post(
            "/formularios/permisos/borrar",
            {idPermiso},
            {withCredentials:true}
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return { succes: false, error: error?.response?.data?.error || error.message };
    }
} 