import {useContext,useState} from 'react'
import { AppuseContext } from '../context/AppContext'
import { assets } from '../assets/assets'
type Props = {}

const SideBar = (props: Props) => {
 const {user,theme,settheme,setchats,chats}=AppuseContext() 
 
    const[search,setsearch]=useState("")


  return (
    <div className='flex flex-col min-h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/90 to-[#000000]/90 border-r border-[#8AB4F8] backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 '>
      <img src={theme==="light"? assets.Gemini_spark:assets.Gemini_spark_dark} alt='' className='w-full  max-w-48'/>
      <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#a456f7] to-[#3d81f6] rounded-md cursor-pointer '> 
      <span className='mr-2 text-2xl '>+</span> 
        New Chat
      </button>
    </div> 
  )
}

export default SideBar