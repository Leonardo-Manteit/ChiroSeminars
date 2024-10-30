import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer'
import Featured from '../Featured/Featured'
import TopicList from '../TopicFilter/TopicList'

export default function Root() {
    return (
    <section className="root">
        <Nav />
        <SearchBar />
        <Featured />
        <TopicList />
        <Footer />
    </section>
    )
}