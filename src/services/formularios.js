import instance from "../axios-instance";

async function fetchFormularios() {
  try {
    const response = await instance.get("/formularios");
    const formularios = response.data;

    return formularios;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error; 
  }
}

export { fetchFormularios } 
