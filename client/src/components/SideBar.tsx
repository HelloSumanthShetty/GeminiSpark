import { useContext, useState } from 'react'
import type { Dispatch,SetStateAction } from 'react'
import { AppuseContext } from '../context/AppContext'
import useMedia from '../hooks/UseMedia'
import { assets } from '../assets/assets'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
type props={
  isMenuOpen:boolean,
  setisMenuOpen:Dispatch<SetStateAction<boolean>>
}

const SideBar = (props: props) => {
  const { user, theme, settheme, setchats,setselectedChat, chats, navigate } = AppuseContext()
  const isAbove=useMedia("(min-width:800px)")
  if(isAbove){
    props.setisMenuOpen(true)
  }
  const [search, setsearch] = useState("")

 console.log(props.isMenuOpen)
  return (
    <div className={` flex flex-col min-h-screen w-72 min-w-50  p-5 m-0 dark:bg-gradient-to-b  from-[#242124]/90 to-[#000000]/90 border-r border-[#8AB4F8] backdrop-blur-3xl transition-all duration-500  left-0 z-10 min-w-20-hidden    ${!props.isMenuOpen && 'max-md:-translate-x-full'}`}>
      <img src={theme === "light" ? assets.Gemini_spark : assets.Gemini_spark_dark} alt='' className='w-full  max-w-48' />
      <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#a456f7] to-[#3d81f6] rounded-md cursor-pointer '>
        <span className='mr-2 text-2xl '>+</span>
        New Chat
      </button>
      {/* search  */}
      <div className='flex items-center rounded-md border  border-gray-400 dark:border-white/30 gap-2 mt-4 p-2'>
        <img src={assets.search_icon} className='w-4 not-dark:invert' alt="search" />
        <input type="text" onChange={(e) => setsearch(e.target.value)} value={search} placeholder='Search Conversation' className='text-xs placeholder:text-gray-400 outline-none' />
      </div>

      {/* recent chats */}
      {chats?.length > 0 &&
        <p className="mt-4 font-semibold text-sm">Recent Chats</p>}
      <div className=' flex-1 overflow-y-scroll mt-3  text-sm space-y-3'>
        {
          chats?.filter((ct: any) => ct.messages[0] ? ct.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : ct.name.toLowerCase().includes(search.toLowerCase())).map((chat: any) => (
            <div key={chat._id} onClick={() => { navigate(`/chat/${chat?._id}`) ; setselectedChat(chat) ; props.setisMenuOpen(false)  }} className='p-2 px-4 mx-1  dark:bg-[#57317c]/10 border border-gray-300 hover:scale-101 dark:border-[#4e90faff] rounded-2xl cursor-pointer flex justify-between group '>
              <div>
                <p className='truncate w-full px-1 '>{chat.messages.length > 0 ? chat.messages[0]?.content.slice(0, 28) : chat.name} </p>
                <p className='text-xs text-gray-500 dark:text-[#b1a6c0]'>{dayjs(chat.updatedAt).fromNow()}</p>
              </div>
              <img src={assets.bin_icon} alt="bin Icon" className='hidden m-1 group-hover:block w-4 cursor-pointer not-dark:invert ' />
            </div>
          ))
        }
      </div>
      {/* Community Images */}
      <div onClick={() => { navigate("/community") ; props.setisMenuOpen(false)}
      } className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.gallery_icon} className='w-4.5 not-dark:invert' alt="" />
        <div className='flex flex-col text-sm'>
          <p>Community Images</p>
        </div>
      </div>
      {/* Credits */}
      <div onClick={() => { navigate("/credits");props.setisMenuOpen(false) }
      } className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.diamond_icon} className='w-4.5 dark:invert' alt="" />
        <div className='flex flex-col text-sm'>
          <p>Credits : {user?.credits}</p>
          <p className='text-xs text-gray-500'>Purchase credits to use Gemini Spark</p>
        </div>
      </div>

      {/* darkmode toggle */}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md'>
        <div className='flex items-center gap-2 text-sm'>
          <img src={assets.theme_icon} className='w-4 not-dark:invert' alt="" />
          <p>Dark Mode</p>
        </div>
        <label className='relative inline-flex cursor-pointer ml-auto '>

          <input type="checkbox" className='sr-only peer ' onChange={() => settheme(theme === "dark" ? "light" : "dark")} checked={theme == "dark"} />
          <div className="w-9 h-5  bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all">
          </div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>
      {/* User Account */}
      <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group'>
        <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
        <p className='flex-1 text-sm dark:text-primary truncate'>
          {user ? user.name : 'Login your account'}
        </p>
        {user && (
          <img
            src={assets.logout_icon}
            className='h-5 cursor-pointer hidden not-dark:invert group-hover:block'
          />
        )}
      </div>
      <img
      onClick={()=>props.setisMenuOpen(false)}
        src={assets.close_icon}
        className='absolute top-3 right-3 w-5 h-5 z-20 md:hidden  cursor-pointer  not-dark:invert'
        alt=""
      />


    </div>
  )
}

export default SideBar