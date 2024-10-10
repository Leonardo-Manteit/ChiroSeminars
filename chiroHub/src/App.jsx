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
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs';
import Login from './components/Login/Login'

function App() {
  return (
    
    <Routes>
{/* for practise */}
        <Route path="/ChiroSeminars/" element={<Root />} />
        <Route path="/ChiroSeminars/Featured" element={<Featured />} />
        <Route path="/ChiroSeminars/Seminars" element={<Seminars />} />
        <Route path="/ChiroSeminars/Topics" element={<TopicList />} />
        <Route path="/ChiroSeminars/CreateEvent" element={<CreateEvents />} />
        <Route path="/ChiroSeminars/Testimonials" element={<Testimonials />} />
        <Route path="/ChiroSeminars/Updates" element={<GetUpdates />} />
        <Route path="/ChiroSeminars/Contact" element={<Contact />} />
        <Route path="/ChiroSeminars/AboutUs" element={<AboutUs />} />
        <Route path="/ChiroSeminars/Login" element={<Login />} />
{/* for deployment */}
        {/* <Route path="https://jesus130247.github.io/ChiroSeminars/" element={<Root />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/Featured" element={<Featured />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/Seminars" element={<Seminars />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/Topics" element={<TopicList />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/CreateEvent" element={<CreateEvents />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/Testimonials" element={<Testimonials />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/Updates" element={<GetUpdates />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/Contact" element={<Contact />} />
        <Route path="https://jesus130247.github.io/ChiroSeminars/AboutUs" element={<AboutUs />} /> */}
    </Routes>
   
          
  );
}

export default App;
