import { useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"


const Signup = () => {
    const[loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {Signup} = useAuthContext()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const registerSubmit =async (e)=>{
        e.preventDefault()
        setLoading(true)
        const result = await Signup(formData.name, formData.email, formData.phone, formData.age, formData.password)
        if(result.error){
            toast.error(result.error)
            setLoading(false)
            return;
        }   
        else{
            toast.success("Signup successful")
            navigate('/login')
        }
        setLoading(false)

    }

  return (
    <div>
        <form onSubmit={registerSubmit} className="flex flex-col gap-2  place-items-center  mt-10"  >
            <div className="flex gap-2">
                <label htmlFor="name">name</label>
                <input type="name" name="name"  id="" placeholder="Enter your Name" value={formData.name}  onChange={handleInputChange} className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="flex gap-2" >
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" value={formData.email} onChange={handleInputChange}  className="border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="flex gap-2">
                <label htmlFor="phone" >Phone</label>
                <input type="tel" name="phone" id="" placeholder="Enter your number" value={formData.phone} onChange={handleInputChange} className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="flex gap-2">
                <label htmlFor="age">Age</label>
                <input type="number" name="age" id="" placeholder="Enter your age" value={formData.age} onChange={handleInputChange} className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" value={formData.password} onChange={handleInputChange}   className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
            <button type="submit" className="bg-blue-500 text-white py-1.5 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-15" disabled={loading}>{loading ? "Signing up..." : "Sign Up"  }</button>
                <p>Already have an account? <Link to="/login"  className="text-blue-500 hover:underline">Login</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Signup