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
