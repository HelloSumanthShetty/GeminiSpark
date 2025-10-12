import React, { useRef, useEffect } from 'react'
import { AppuseContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

type MessageType = {
  role: string
  isImage?: boolean
  content: string
  timestamp: string
}
// type promptType = {
//   prompt: string
// }
type Props = {}

const ChatBot = (props: Props) => {
  const { theme, selectedChat,axios } = AppuseContext()
  const [messages, setMessages] = React.useState<MessageType[]>([])
  const [Loading, setLoading] = React.useState(false)
  const [prompt, setPrompt] = React.useState("")
  const [isPublished, setIsPublished] = React.useState(false)
  const [mode, setMode] = React.useState("text")
  const containerRef = useRef<HTMLDivElement>(null);

const onSubmit=async(e:React.FormEvent)=>{
  e.preventDefault()
  if(!selectedChat){
    return
  }
  try {
    setLoading(true)
    let type;
    mode==='image'? type="image":type="text" 
    setMessages(prev=>[...prev ,{role:"user",content:prompt,timestamp:new Date().toISOString(),isImage:mode==='image'? true:false}])
    console.log(messages)
    const res=await axios.post(`/api/message/${type}`,{
      chatId:selectedChat._id,
      prompt,
      isPublished:isPublished
    }, { withCredentials: true })
    const data=await res.data 
    if(data.success){
      console.log(data)
      setMessages(prev=>[...prev ,data?.reply]) 
      console.log(messages)
      setPrompt("")
      setIsPublished(false)
    }
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({top:containerRef.current.scrollHeight, behavior:"smooth"});
    }
  }, [messages]);
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10  xl:mx-15 max-md:mt-14 2xl:pr-40'>
      {/* Chat Messages */}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img
              src={theme === 'light' ? assets.Gemini_spark : assets.Gemini_spark_dark}
              alt=""
              className='w-full max-w-56 sm:max-w-68'
            />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me anything.
            </p>
          </div>
        )}
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {
          Loading && (
            <div className='loader flex items-center gap-1.5'>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            </div>
          )
        }
</div>
{mode === 'image' && (
  <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto cursor-pointer">
    <p className="text-xs">
      Publish Generated Image to Community
    </p>
    <input
      type="checkbox"
      className="cursor-pointer"
      checked={isPublished}
      onChange={(e) => setIsPublished(e.target.checked)}
    />
  </label>
)}


     {/* Prompt Input Box */}

<form
  onSubmit={onSubmit}
  className="bg-white dark:bg-neutral-800  border border-primary dark:border-[#8069F1]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center"
>
  <select
    onChange={(e) => setMode(e.target.value)}
    value={mode}
     className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-purple-950 text-sm px-2 py-1 outline-none dark:focus:ring-2 dark:focus:ring-purple-500 transition-all"
   >
    <option className="dark:bg-purple-900 font-semibold" value="text">Text</option>
    <option className="dark:bg-purple-900 font-semibold" value="image">Image</option>
  </select>

  <input
    onChange={(e) => setPrompt(e.target.value)}
    value={prompt}
    type="text"
    placeholder="Type your prompt here..."
    className="flex-1 w-full text-sm outline-none"
    required
  />

  <button disabled={Loading}>
    <img
      src={Loading? assets.stop_icon : assets.send_icon}
      className="w-8 cursor-pointer"
      alt=""
    />
  </button>
</form>

    </div>
  )


}

export default ChatBot