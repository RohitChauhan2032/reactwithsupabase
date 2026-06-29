import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";



const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
            console.log(error.message);
            return { data: null, error: error.message };
        } else {
            console.log(data);
            setUsers(data);
            return { data, error: null };
        }
    };
    useEffect(() => {
        getUsers();
    }, []);
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.age}</td>
                        <td>{user.role}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserManagement