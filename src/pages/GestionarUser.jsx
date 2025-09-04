import ChangePass from "../components/ChangePass";
import useAuth from "../hooks/useAuth"

function MeUserTab(){
    const {auth} = useAuth()
    console.log(auth);
    return(
        <ChangePass
            user={auth}
        >

        </ChangePass>
    )
}

export default MeUserTab