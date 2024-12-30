import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";


function AdminDashboard() {
    const { user, isLoading } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/admin/allusers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 403) {
                        setError('You are not authorized to visit this section');
                    } else {
                        setError('An error occurred while fetching users');
                    }
                } else {
                    setError('An error occurred while fetching users');
                }
                console.log(error);
            }
        };

        if (user && user.isAdmin) {
            fetchUsers();
        } else {
            setError('You are not authorized to visit this section');
        }
    }, [user]);

    if (isLoading) {
        return <h1>...Loading</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            <h1>Welcome Admin</h1>
            {users.map((value) => (
                <div key={value._id}>
                    <h1>{value.name}</h1>
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;
