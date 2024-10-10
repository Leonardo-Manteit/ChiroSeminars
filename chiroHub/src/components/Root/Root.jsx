import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer'
import Featured from '../Featured/Featured'
import TopicList from '../TopicList/TopicList'
import { useState } from 'react';
import { getUserFromLocalStorage } from '../../utils/auth_service.js'

export default function Root() {
    const [user, setUser] = useState(getUserFromLocalStorage())
    return (
    <section className="root">
        <Nav user={user} setUser={setUser}/>
        <SearchBar />
        <Featured />
        <TopicList />
        <Footer />
    </section>
    )
}