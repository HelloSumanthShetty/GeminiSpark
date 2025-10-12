import React, { useState, useEffect, use } from 'react'
import { AppuseContext } from '../context/AppContext'
import LoadingPage from './Loading'
import  { Toaster } from 'react-hot-toast'


type Props = {}
type PublishedImages = {
  imageUrl: string;
  userName: string;
}
const Community = () => {
const [images, setImages] = useState<PublishedImages[]>([])
const {axios}=AppuseContext()
const [Loading, setLoading] = useState(true)

const fetchImages=async()=>{
  try {
    setLoading(true)    
    const res=await axios.get("/api/chat/community", { withCredentials: true })
    const data=await res.data
    if(data.success){
      console.log(data.newChat)
      setImages(data.newChat)

    }
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }         
}

  useEffect(() => {
    fetchImages()
  }, [])


  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-[90%] mx-auto h-full overflow-y-scroll'>
  <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100'>
    Community Images:
  </h2>
  {!Loading &&images.length > 0 ?  (
    <div className='flex flex-wrap max-sm:justify-center gap-5'>
      {images.map((item, index) => (
        <a 
          key={index} 
          href={item.imageUrl} 
          target='_blank' 
          className='relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-all duration-300'
        >
          <img 
            src={item.imageUrl} 
            alt='' 
            className='w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out' 
          />
          <p className='absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300'>
            Created by {item.userName}
          </p>
        </a>
      ))}
    </div>
  ) : (
   <><LoadingPage /></>
  )}
</div>

  )
}

export default Community