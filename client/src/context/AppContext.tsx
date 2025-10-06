import { createContext,useState,useContext,useEffect } from "react"
import type {Dispatch,SetStateAction} from "react"
import type {NavigateFunction} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import {dummyUserData,dummyChats} from "../assets/assets"
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL=import.meta.env.VITE_SERVER_URL;

type AppContextType={
  navigate: NavigateFunction;
  user: fetchUserType | undefined;
  setuser: Dispatch<SetStateAction<fetchUserType | undefined>>;
  chats: any;
  setchats: Dispatch<SetStateAction<any>>;
  selectedChat: any;
  setselectedChat: Dispatch<SetStateAction<any>>;
  theme: string;
  settheme: Dispatch<SetStateAction<string>>;
  fetchUser: () => Promise<void>;
  axios: typeof axios;
  loadingUser: boolean; 

};

type fetchUserType={
     _id: string;
    name: string;
    email: string;
    password: string;
    credits: number;
}
const AppContext = createContext<AppContextType|undefined>(undefined)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    // console.log(document.cookie)
    
    const [user, setuser] = useState<fetchUserType>();
    const [token, setToken] = useState<string | null>();
    const [chats, setchats] = useState<any >();
    const [selectedChat, setselectedChat] = useState<any>();
    const [loadingUser,setloadingUser]=useState(false);
    const [theme, settheme] = useState(localStorage.getItem("theme") || "light");
    const fetchUser = async () => {
        try {
          setloadingUser(true);
          const {data} =await axios.get("/api/user",{withCredentials:true});
          if(data.success){
          setuser(data.user);
          }
          else
          {
           // setuser(dummyUserData); 
           toast.error(data.message)
          }
        } catch (error) {
          toast.error("Something went wrong while fetching user");
        } finally {
          setloadingUser(false);
        }
    };
    const cookies=()=>{
      const value = document.cookie;
      const part= value.split("=").pop();
      setToken(part||null);
    }
    
    const fetchUserChat = async () => {
       try {
        const {data}=await axios.get("/api/chat",{withCredentials:true});
        console.log(data)
        if(data.success){
          setchats(data.newchat);
        }
        if(data.newchat.length===0){
          await createNewChat();
          return fetchUserChat();
        }
        else{
          setselectedChat(data.newchat[0])
        }
       } catch (error) {
        toast.error("Something went wrong while fetching chats");
       }
    };

 const createNewChat=async()=>{
  try {
     if(!user) return toast.error("Please login to create a new chat");
     navigate("/");
    const {data}=await axios.post("/api/chat",{withCredentials:true});
    if(data.success)  await fetchUserChat();
  } catch (error) {
    toast.error("Something went wrong while creating a new chat");
  }
}
    useEffect(()=>{ 
      cookies();
    },[token])
    
    useEffect(() => {
      if(token){
          fetchUserChat();
      }
      else{
        setchats([])
        setselectedChat(null)
      }
    },[token])

    useEffect(()=>{
      if(theme==="dark"){
     document.documentElement.classList.add("dark"); 
     localStorage.setItem("theme","dark")
    }
      else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme","light")
      }

    },[theme])
    
    useEffect(() => {
      if(token)
      fetchUser();
    else
      setuser(undefined);
      setloadingUser(false);
    }, [token]);
    const value = { navigate,axios, loadingUser, user, setuser, chats, setchats, selectedChat, setselectedChat, fetchUserChat, theme, settheme, fetchUser };
    return (
        <AppContext.Provider value={value}>
          {children}
        </AppContext.Provider>
    );
}


export const AppuseContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppuseContext must be used within AppContextProvider");
  }
  return context;
};