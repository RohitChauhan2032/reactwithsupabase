// import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext"

// import { useNavigate } from "react-router-dom"


const Profile = () => {
    const {user} = useAuthContext()
    // const navigate = useNavigate()
    // const {Logout} = useAuthContext()
    console.log(user)

    // const handleLogout =async ()=>{
    //   const res = await  Logout()
    //   console.log(res)
    //   if(res.error){
    //     toast.error(res.error)
    //     return;
    //   }else{
    //     toast.success("Logout successful")
    //     navigate('/login')
    //   }
    // }

  return (
    <div>
      
        <p>email: {user?.email} </p>
    </div>
  )
}

export default Profile