import { Routes, Route } from 'react-router-dom';
import Root from './components/Root/Root'
// import Nav from './components/Nav/Nav';
// import Footer from './components/Footer/Footer';
import CreateEvents from './components/CreateEvent/CreateEvents';
import EditEvent from './components/EditEvent/EditEvent';
import Featured from './components/Featured/Featured';
import GetUpdates from './components/GetUpdates/GetUpdates';
import TopicFilter from './components/TopicFilter/TopicFilter';
import Testimonials from './components/Testimonials/Testimonials';
// import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import Seminars from './components/Seminars/Seminars';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs';
import Login from './components/Login/Login'
import DisplaySeminar from './components/DisplaySeminar/DisplaySeminar';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/Featured" element={<Featured />} />
        <Route path="/Seminars" element={<Seminars />} />
        <Route path="/Topics" element={<TopicFilter />} />
        <Route path="/CreateEvent" element={<CreateEvents />} />
        <Route path="/EditEvent/:id" element={<EditEvent />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/Updates" element={<GetUpdates />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/DisplaySeminar/:id" element={<DisplaySeminar />} /> 
    </Routes>
   );
}

export default App;