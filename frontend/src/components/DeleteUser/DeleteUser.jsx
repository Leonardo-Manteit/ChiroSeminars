import {deleteUser} from '../../utils/user_functions'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getUserFromLocalStorage } from '../../utils/auth_service';

export default function DeleteUser() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const navigate = useNavigate()

    function handleDelete() {
        deleteUser(user.id)
        setUser(null)
        localStorage.removeItem('token');
        navigate('/')
    }
    return (
        <button onClick={handleDelete}>Delete User</button>
    )
}