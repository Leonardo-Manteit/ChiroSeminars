import { useNavigate } from "react-router-dom";
export default function EditBtn({seminar}) {
    const navigate = useNavigate();
    function handleEdit(seminar) {
        navigate(`/ChiroSeminars/EditEvent/${seminar.id}`, {
            state: {seminar},
        });
    }
    return (
        <button onClick={() => handleEdit(seminar)}>Edit Seminar</button>
    )
}