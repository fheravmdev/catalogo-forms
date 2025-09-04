import instance from "../axios-instance";

async function login(user){
    try {
        const response = await instance.post("/login", user, {
            withCredentials: true
        })

        const result = response?.data;
        console.log("recibidos: ", result)
        if (result.success) {
            return {
                success: true,
                user: result.user
            };
        }
        return result;
    } catch (error) {
        return {sucess: false, message: error?.response?.data?.error || error.message}
    }
}

export default login