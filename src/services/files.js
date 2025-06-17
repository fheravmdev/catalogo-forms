import axios from "../axios-instance";

export async function uploadFile(formData) {
    try {
        const response = await axios.post(
            "/upload/file/",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

export async function getMyFiles() {
    try {
        const response = await axios.get("/me/files", { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

export async function downloadFile(idArchivo, nombreArchivo) {
    try {
        const response = await axios.get(`/download/${idArchivo}`, {
            responseType: "blob",
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", nombreArchivo || `archivo_${idArchivo}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        return { success: true };
    } catch (error) {
        return { success: false, error: error?.response?.data?.error || error.message };
    }
}

export async function getUsers() {
    try {
        const response = await axios.get("/users", { withCredentials: true });
        return response.data;
    } catch (error) {
        return [];
    }
}

export async function shareFile({ idArchivo, idUser, permisos }) {
    // permisos: array of strings, e.g. ['ver', 'eliminar']
    let results = [];
    for (const permiso of permisos) {
        try {
            const res = await axios.post("/archivo_permiso", {
                idArchivo,
                idUser,
                permiso
            }, { withCredentials: true });
            results.push(res.data);
        } catch (error) {
            results.push({ success: false, error: error?.response?.data?.error || error.message });
        }
    }
    return results;
}