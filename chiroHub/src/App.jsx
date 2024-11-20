import { Routes, Route } from 'react-router-dom';
import CreateEvents from './components/CreateEvent/CreateEvents';
import EditEvent from './components/EditEvent/EditEvent';
import './App.css';
import Seminars from './components/Seminars/Seminars';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs';
import Login from './components/Login/Login'
import DisplaySeminar from './components/DisplaySeminar/DisplaySeminar';
import Dashboard from './components/Dashboard/Dashboard';
import Homepage from './components/Homepage/Homepage';
import Favourites from './components/Favourites/Favourites';
import VerifyEmail from './components/EmailVerification/EmailVerification';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Seminars" element={<Seminars />} />
        <Route path="/CreateEvent" element={<CreateEvents />} />
        <Route path="/EditEvent/:id" element={<EditEvent />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/DisplaySeminar/:id" element={<DisplaySeminar  />} /> 
        <Route path="/Dashboard/:id" element={<Dashboard />} />
        <Route path="/Favourites" element={<Favourites  />} /> 
        <Route path="/verify-email" element={<VerifyEmail />} />
    </Routes>
   );
}

export default App;