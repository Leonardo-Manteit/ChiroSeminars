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

import { useState } from 'react';
import { getUserFromLocalStorage } from './utils/auth_service';

function App() {

  const [user, setUser] = useState(getUserFromLocalStorage());
  const [favourites, setFavourites] = useState(user.favouriteSeminarIds)
  // passing this information ONLY works if it is the component being loaded
  return (
    <Routes>
        <Route path="/" element={<Homepage user={user} favourites={favourites} />} />
        <Route path="/Seminars" element={<Seminars />} />
        <Route path="/CreateEvent" element={<CreateEvents />} />
        <Route path="/EditEvent/:id" element={<EditEvent />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/DisplaySeminar/:id" element={<DisplaySeminar  />} /> 
        <Route path="/Dashboard/:id" element={<Dashboard user={user} favourites={favourites} setFavourites={setFavourites}/>} />
        <Route path="/Favourites" element={<Favourites user={user} favourites={favourites} setFavourites={setFavourites} />} />
    </Routes>
   );
}

export default App;