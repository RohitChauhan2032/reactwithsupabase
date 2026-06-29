import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Navbar from "./component/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Profiler } from "react"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import UserManagement from "./pages/Admin/UserManagement"
import AddProduct from "./pages/Admin/AddProduct"
import ProductList from "./pages/Admin/ProductList"





function App() {


  return (
    <>
    <ToastContainer />
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={ <Signup/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/profile' element={ <Profiler/>} />
        {/* // nested route  */}
        <Route path='/adminDashboard' element={ <AdminDashboard/>}>
          <Route path='users' element={ <UserManagement/>} /> 
          <Route path='add-product' element={ <AddProduct/>} /> 
          <Route path='products' element={ <ProductList/>} /> 
        </Route>

      </Routes>
    </BrowserRouter>
    
    </> 
  )
}

export default App
