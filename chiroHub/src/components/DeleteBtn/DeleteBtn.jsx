import { deleteSeminar } from "../../utils/seminar_api";

export default function DeleteBtn({setDeleted, user, seminar}) {

    function handleDelete(id) {
        setDeleted('none');
        deleteSeminar(id);
    }

    if (user) {
        return (
            <>
            {user.id === seminar.user_id ? <button onClick={() => handleDelete(seminar.id)}>Delete Seminar</button> : null }
            </>
        )
    }
}