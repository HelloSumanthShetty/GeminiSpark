import { useState } from 'react'
import reactLogo from './assets/react.svg'
import useMedia from './hooks/UseMedia'
import SideBar from './components/SideBar'
import { Routes,Route,useLocation ,Navigate} from 'react-router-dom'
import Credits from './pages/Credits'
import {AppuseContext} from './context/AppContext'
import { assets } from './assets/assets'
import  "./assets/prism.css"
import Community from './pages/Community'
import ChatBot from './components/ChatBot'
import  { Toaster } from 'react-hot-toast'
import LoginPage from './pages/Login'
import LoadingPage from './pages/Loading'



function App() {
 const {user,Token}=AppuseContext()
 console.log(user)
 const {pathname}=useLocation()
 if(pathname==="/loading") {
  return <LoadingPage/>
}
if(pathname==="/login" && Token) {
  return <LoginPage/>
}

  const [isMenuOpen, setisMenuOpen] = useState(false)
  // const isAbove=useMedia("(min-width:800px)")
   
  return (
    <>
    {!isMenuOpen && Token && (
  <img
    src={assets.menu_icon}
    className={`absolute top-3 left-3 w-8 h-8 cursor-pointer  not-dark:invert`}
    onClick={() => {
      setisMenuOpen(true)}}
  />
)}

      <Toaster position='top-center' reverseOrder={false} />
    {Token? (<div className='dark:bg-gradient-to-b min-h-screen overflow-hidden font-dm from-[#242124] to-[#000000] dark:text-white'>
    <div className='flex h-screen overflow-scroll w-screen'> 
      
      
      <SideBar  isMenuOpen={isMenuOpen} setisMenuOpen={setisMenuOpen}/>
      <Routes>
      
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/community" element={<Community />} />
           <Route path="*" element={<Navigate to={Token ? "/chat" : "/login"} />} />
      </Routes>
      </div>
    </div>):(
      <div className='flex h-screen overflow-scroll w-screen justify-center items-center'>
      <LoginPage />
    </div>
    )}
    </> 
  )
}

export default App
