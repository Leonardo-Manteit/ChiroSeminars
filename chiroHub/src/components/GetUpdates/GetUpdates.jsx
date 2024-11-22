import { useState } from "react"
import { getUpdates, stopUpdates } from "../../utils/seminar_api"
import { updateToken } from "../../utils/auth_service"

export default function GetUpdates({user, seminar}) {
    const [beingUpdated, setBeingUpdated] = useState(seminar?.email_list?.includes(user.email))
    
    function handleUpdate() {
        beingUpdated ? stopUpdates(seminar.id, user.email) : getUpdates(seminar.id, user.email)
        setBeingUpdated(!beingUpdated)
        updateToken(user)
    }

    return (
    <section className="getUpdates">
        <div>This will allow us to send you emails with updates on this seminar</div>
        <button onClick={handleUpdate}>{beingUpdated ? 'Stop Updates' : 'Get updates!'}</button>
    </section>
    )
}