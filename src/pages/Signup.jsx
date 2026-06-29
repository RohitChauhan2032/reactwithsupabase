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
        <form onSubmit={registerSubmit}>
            <div>
                <label htmlFor="name">name</label>
                <input type="name" name="name" id="" value={formData.name}  onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" value={formData.email} onChange={handleInputChange}  />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="tel" name="phone" id="" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <input type="number" name="age" id="" value={formData.age} onChange={handleInputChange}  />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" value={formData.password} onChange={handleInputChange} />
            </div>
            <div>
            <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Signup