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
        <form onSubmit={loginSubmit}  className="place-items-center  mt-10 flex flex-col gap-3" >
            <div className="flex gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="flex gap-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" value={password} onChange={(e)=>setPassword(e.target.value)} className="border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
            <button type="submit" className="bg-blue-500 text-white py-1.5 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-15"  disabled={loading}>{loading ? "Signing..." : "Login"}</button>
            <p>Don't have an account? <Link to={'/signup'} className="text-blue-500 hover:underline">Signup here</Link> </p>
               
            </div>
        </form>
    </div>
  )
}

export default Login