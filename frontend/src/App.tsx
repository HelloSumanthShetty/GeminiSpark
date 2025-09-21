import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SideBar from './components/SideBar'
import { Routes,Route } from 'react-router-dom'
import Credits from './pages/Credits'
import Community from './pages/Community'
import ChatBot from './components/ChatBot'
function App() {
  

  return (
    <>
      <SideBar />
      <Routes>
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/community" element={<Community />} />
           
      </Routes>
    </>
  )
}

export default App
