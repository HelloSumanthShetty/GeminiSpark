import { useState,useEffect } from 'react'
import useMedia from './hooks/UseMedia'
import SideBar from './components/SideBar'
import { Routes,Route,useLocation ,Navigate} from 'react-router-dom'
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

  const [isMenuOpen, setisMenuOpen] = useState<boolean>(true)
  // const isAbove=useMedia("(min-width:800px)")
     const isAbove=useMedia("(min-width:400px)")
 
     useEffect(() => {
 

    if(!isAbove){
     setisMenuOpen(false)
  }
  else{
    setisMenuOpen(true)
  }
  }, [isAbove])
  return (
    <>
    {!isMenuOpen && Token && (
  <img
    src={assets.menu_icon}
    className={`absolute top-3 z-10 left-3 w-8 h-8 cursor-pointer  not-dark:invert`}
    onClick={() => {
      setisMenuOpen(true)}}
  />
)}
      <Toaster position='top-center' reverseOrder={false} />
    {Token? (<div className='dark:bg-gradient-to-b relative min-h-screen overflow-hidden font-dm from-[#242124] to-[#000000] dark:text-white'>
    <div className='flex h-screen overflow-scroll w-screen absolute  bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px] ] '> 
      
      
      <SideBar  isMenuOpen={isMenuOpen} setisMenuOpen={setisMenuOpen}/>
      <Routes>
      
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/community" element={<Community />} />
           <Route path="*" element={<Navigate to={Token! ?  "/login":"/chat"} />} />
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
