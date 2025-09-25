import { useState, useEffect } from "react";

const useMedia=(query:string)=>{
    const [Matches,setMatchs]=useState(false)
      
      
    useEffect(()=>{
      const media=window.matchMedia(query)
      if(media.matches!=Matches) setMatchs(media.matches)
        const listeners=()=>setMatchs(media.matches)
     window.addEventListener("resize",listeners)
     return()=>window.removeEventListener("resize",listeners) 
    },[Matches,query])  
    return Matches
}

export default useMedia