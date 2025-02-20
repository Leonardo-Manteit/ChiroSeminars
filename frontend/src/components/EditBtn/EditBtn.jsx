import { useNavigate } from "react-router-dom";
export default function EditBtn({seminar, user}) {
    const navigate = useNavigate();
    function handleEdit(seminar) {
        navigate(`/EditEvent/${seminar.id}`, {
            state: {seminar},
        });
    }
    if (user) {
        return (
            <>
            {user.id === seminar.user_id ? <button onClick={() => handleEdit(seminar)}>Edit Seminar</button> : null }
            </>
        )
    }
}