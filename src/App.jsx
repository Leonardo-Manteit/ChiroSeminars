import { Routes, Route } from 'react-router-dom';
import Root from './components/Root/Root'
// import Nav from './components/Nav/Nav';
// import Footer from './components/Footer/Footer';
import CreateEvents from './components/CreateEvent/CreateEvents';
import Featured from './components/Featured/Featured';
import GetUpdates from './components/GetUpdates/GetUpdates';
import TopicList from './components/TopicList/TopicList';
import Testimonials from './components/Testimonials/Testimonials';
// import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import Seminars from './components/Seminars/Seminars';

function App() {
  return (
    
    <Routes>
        <Route path="/ChiroSeminars/" element={<Root />} />
        <Route path="/ChiroSeminars/featured" element={<Featured />} />
        <Route path="/ChiroSeminars/seminars" element={<Seminars />} />
        <Route path="/ChiroSeminars/topics" element={<TopicList />} />
        <Route path="/ChiroSeminars/create-event" element={<CreateEvents />} />
        <Route path="/ChiroSeminars/testimonials" element={<Testimonials />} />
        <Route path="/ChiroSeminars/updates" element={<GetUpdates />} />
    </Routes>
   
          
  );
}

export default App;
