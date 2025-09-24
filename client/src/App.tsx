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
    <div className='dark:bg-gradient-to-b font-dm from-[#242124] to-[#000000] dark:text-white'>
    <div className='flex min-h-screen w-screen '>
      <SideBar />
      <Routes>
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/community" element={<Community />} />
           
      </Routes>
      </div>
    </div>
    </> 
  )
}

export default App
