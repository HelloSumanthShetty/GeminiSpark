import { createContext,useState,useContext,useEffect } from "react"
import type {Dispatch,SetStateAction} from "react"
import type {NavigateFunction} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import {dummyUserData,dummyChats} from "../assets/assets"
type Props = {}
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
    const [user, setuser] = useState<fetchUserType>();
    const [chats, setchats] = useState<any >();
    const [selectedChat, setselectedChat] = useState<any>();
    const [theme, settheme] = useState(localStorage.getItem("theme") || "light");
    const fetchUser = async () => {
        setuser(dummyUserData);
    };
    const fetchUserChat = async () => {
        setchats(dummyChats);
        setselectedChat(dummyChats[0]);
    };
    useEffect(()=>{
      if(user){
          fetchUserChat();
      }
      else{
        setchats([])
        setselectedChat(null)
      }
    },[user])

    useEffect(()=>{
      if(theme==="dark"){
     document.documentElement.classList.add("dark");      
    }
      else{
           document.documentElement.classList.remove("dark");
      }
    },[theme])
    
    useEffect(() => {
        fetchUser();
    }, []);
    const value = { navigate, user, setuser, chats, setchats, selectedChat, setselectedChat, theme, settheme, fetchUser };
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