import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"


const Navbar = () => {
  const {Logout,user} = useAuthContext()
  const navigate = useNavigate()
     const handleLogout =async ()=>{
      const res = await  Logout()
      console.log(res)
      if(res.error){
        toast.error(res.error)
        return;
      }else{
        toast.success("Logout successful")
        console.log('logout')
        navigate('/login')
        return ;
      }
    }

  console.log(user)

  return (
    <div>
      <Link to={'/'}>Navbar</Link>
      <div>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        {
          user ? (
            <button onClick={handleLogout}>Logout</button>
          ) :(
            <Link to="/login">Login</Link>
          )
        }
      </div>
    </div>
  )
}

export default Navbar 