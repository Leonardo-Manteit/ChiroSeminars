<<<<<<< Updated upstream
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route path="/" element={<Root />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/seminars" element={<Seminars />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/create-event" element={<CreateEvents />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/updates" element={<GetUpdates />} />
      </Routes>
          
  );
}

export default App;
=======
import { useState } from 'react'
import Nav from './components/Nav/Nav'
import Footer from './components/footer/Footer'
import CreateEvents from './components/createEvent/CreateEvents'
import Featured from './components/featured/Featured'
import GetUpdates from './components/getUpdates/GetUpdates'
import TopicList from './components/TopicList/TopicList'
import Testimonials from './components/Testimonials/Testimonials'
import SearchBar from './components/SearchBar/SearchBar'
import './App.css'

function App() {

  return (
    <>
      <Nav />
      <SearchBar />
      <Featured />
      <TopicList />
      <CreateEvents />
      <Testimonials />
      <GetUpdates />
      <Footer />
    </>
  )
}

export default App
>>>>>>> Stashed changes
