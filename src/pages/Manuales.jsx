import useAuth from "../hooks/useAuth"


function Manuales(){
    const {auth, setAuth} = useAuth() 
    return(
        <div>Hola, {auth.username}. Se está trabajando en esta página todavía...</div>
    )
}

export default Manuales