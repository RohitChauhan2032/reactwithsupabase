import { Link,Outlet } from "react-router-dom"


const AdminDashboard = () => {
  
  return (
    <div className=' flex gap-6'>
        <div className='flex flex-col gap-10 border-r border-gray-600'>
        <h1>Dashboard</h1>
        <nav className=' flex flex-col gap-2'>
            <Link to={'/adminDashboard/users'}>User List</Link>
            <Link to={'/adminDashboard/add-product'}>Add Product</Link>
            <Link to={'/adminDashboard/products'}>Product List</Link>
            <Link to={'/adminDashboard/orders'}>Order</Link>
        </nav>

        </div>
        

        <Outlet/>
    </div>
  )
  
  
}

export default AdminDashboard 