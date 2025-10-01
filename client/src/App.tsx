import { useState } from 'react'
import reactLogo from './assets/react.svg'
import useMedia from './hooks/UseMedia'
import SideBar from './components/SideBar'
import { Routes,Route } from 'react-router-dom'
import Credits from './pages/Credits'
import { assets } from './assets/assets'
import Community from './pages/Community'
import ChatBot from './components/ChatBot'



function App() {
  const [isMenuOpen, setisMenuOpen] = useState(false)
   const isAbove=useMedia("(min-width:800px)")
  return (
    <>
    {!isMenuOpen &&(
  <img
    src={assets.menu_icon}
    className={`absolute top-3 left-3 w-8 h-8 cursor-pointer  not-dark:invert`}
    onClick={() => {
      setisMenuOpen(true)}}
  />
)}

 <div className={`${isAbove ? 'flex' : 'hidden'}`}>
    <div className='dark:bg-gradient-to-b min-h-screen overflow-hidden font-dm from-[#242124] to-[#000000] dark:text-white'>
    <div className='flex h-screen overflow-scroll w-screen'> 
      <SideBar  isMenuOpen={isMenuOpen} setisMenuOpen={setisMenuOpen}/>
      <Routes>
          <Route path="/chat/:id" element={<ChatBot />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/community" element={<Community />} />
           
      </Routes>
      </div>
    </div>
    </div>
    </> 
  )
}

export default App
