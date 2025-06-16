import useAuth from "../hooks/useAuth"


function Admin(){
    const {auth, setAuth} = useAuth() 
    return(
        <div>Hola, admin {auth.username}</div>
    )
}

export default Admin