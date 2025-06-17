import instance from "../axios-instance";

async function fetchFormularios() {
  try {
    const response = await instance.get("/formularios");
    const formularios = response.data;
    console.log(formularios)
    return formularios;
  } catch (error) {
    console.error("Error al obtener fomularios:", error);
    throw error; 
  }
}

export { fetchFormularios } 
