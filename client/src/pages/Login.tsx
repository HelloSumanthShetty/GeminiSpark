import { AppuseContext } from '../context/AppContext';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Login = () => {
   const navigate=useNavigate()
   const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {axios,setuser,setToken} = AppuseContext();
    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();
        const endpoint = state === "login" ? "/api/user/login" : "/api/user/register";
        const payload = state === "login" ? { email, password } : { name, email, password };
        try {
            const response = await axios.post(endpoint, payload, { withCredentials: true });
            const data = await response.data;
            if (data.success) {
                localStorage.setItem("token",data.token);
                setToken(data.token);
                setuser({ _id: data.userId, name: data.username, email: data.useremail, password: "", credits: 200 });
                navigate("/chat");  
            }
        }
        catch (error:any) {
            console.error("Error:", error);
            toast.error("Something went wrong");
            setError(error.response?.data?.error?.[0]?.msg || error.response?.data?.error || "Something went wrong");
        }
    }; 
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-[#4e90faff]">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input id='name' name='name' onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input id='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input id='password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            {error && <p className='text-sm text-red-600 font-semibold'>{error}</p>}
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            )}
            <button type='submit' className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    );
};


export default Login