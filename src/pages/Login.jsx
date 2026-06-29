import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext"


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {Login} = useAuthContext()

    const loginSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
       const data = await Login(email,password)
      
       if(data.error){
            toast.error(data.error)
            setLoading(false)
            return;
       }else{
           console.log(data)
           toast.success("Login successful")
           if(data.userData.role === 'superadmin' || data.userData.role === 'admin'){
            navigate('/adminDashboard')
           setLoading(false)
       }else{
        navigate('/profile')
        setLoading(false)
       }

       }
    }

  return (
    <div>
        <form onSubmit={loginSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
            <button type="submit" disabled={loading}>{loading ? "Signing..." : "Login"}</button>
            <p>Don't have an account? <Link to={'/signup'}>Signup here</Link> </p>
               
            </div>
        </form>
    </div>
  )
}

export default Login