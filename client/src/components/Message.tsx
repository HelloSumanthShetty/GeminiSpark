import { useEffect } from 'react'
import { assets } from '../assets/assets'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ReactMarkdown from "react-markdown"
import Prism from "prismjs" 
dayjs.extend(relativeTime)  

type Props = {
  message: {
    role: string
    isImage?: boolean
    content: string
    timestamp: string
  }
}

const Message = (props: Props) => {
  const { message } = props
  const formattedTimestamp = dayjs(message.timestamp).fromNow()
  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])
  return (
    <div>
      {message.role === "user" ? (
        <div className='flex z-10 items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-100 dark:bg-green-700 border border-[#80609F]/30 rounded-md max-w-2xl'>
            <p className='text-sm dark:text-primary'>{message.content}</p>
            <span className='text-xs text-gray-400  dark:text-[#B1A6C0]'>{formattedTimestamp}</span>
          </div>
          <img src={assets.user_icon} alt="" className='w-8 rounded-full' />
        </div>
      ) : (
        <div className='inline-flex flex-col gap-2 p-1  max-w-2xl    bg-primary dark:bg-[#57317C] border border-[#80609F]/30 rounded-md my-4'>
          {message.isImage ? (
            <img
              src={message.content}
              alt=""
              className='w-full max-w-md mt-2 rounded-md'
            />
          ) : (
            <div className='text-sm leading-loose dark:text-primary p-3 tracking-widest overflow-x-auto '>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
          <span className='text-xs pl-2 text-gray-400 dark:text-[#B1A6C0]'>
            {formattedTimestamp}
          </span>
        </div>

      )}
    </div>
  )
}

export default Message