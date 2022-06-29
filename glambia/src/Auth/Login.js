import React,{useState} from 'react'
import { FaEye,FaEyeSlash,FaCheck} from "react-icons/fa";
import { useNavigate } from "react-router-dom"  


function Login() {
    const [passType, setPassType] = useState(false);
    const [workNumber, setWorkNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorShow, setErrorShow] = useState(false);
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
            if (workNumber === "") {
                setErrorShow(true);
                setError("Work number is required");
            } else if (password === "") {
                setErrorShow(true);
                setError("Password is required");
            }
            else {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        workNumber: workNumber,
                        password: password,
                        admin: admin
                    })
                });
                try {
                const data = await response.json();
                console.log("any")
                console.log(data)
                localStorage.setItem("employee", JSON.stringify(data));
                navigate("/");
                } catch(e) {
                    setErrorShow(true);
                    setError("Invalid work number or password or invalid admin status");
                }
               
                
            }
        
        
    }
    
    
  return (
    
    <div className="grid place-content-center gap-1 md:grid-cols-1">
        <div className="hidden md:inline-flex my-20 mx-auto shadow rounded-sm w-2/5 justify-center">
            <div className="flex flex-col items-center justify-center w-full">
            {errorShow ? <h1 className="bg-red-600 text-white w-full align-center rounded-t-md text-center font-semibold py-1">{error}</h1> : null}
                <h1 className="text-2xl font-semibold mb-8">Login</h1>
                    <input onChange={(e) => setWorkNumber(e.target.value)} className="w-4/5 placeholder:italic placeholder:text-slate-400 block bg-white w-full border h-10 border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-0.5 sm:text-sm mb-3" placeholder="Work number" type="text" name="worknum"/>
                    <div className="w-4/5  inline-flex">
                        <input onChange={(e) => setPassword(e.target.value)} className="w-8/10 placeholder:italic placeholder:text-slate-400 block h-10 bg-white w-full border border-slate-300 rounded-l-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-0.5 sm:text-sm mb-3" placeholder="Password" type={passType ? "text" : "password"} name="password"/>
                        <button className="bg-black text-white rounded-r-md px-4 h-10" onClick={() => setPassType(!passType)}>{passType ? <FaEyeSlash/> : <FaEye/>}</button>
                    </div>
                    <div className="w-4/5 inline-flex">
                        <h1 className="text-sm">Click this box if you are admin staff.</h1>
                        <button className={admin ? "border-2 border-black bg-black w-4 h-4 mt-0.5 ml-2" : "border-2 border-black bg-white w-4 h-4 mt-0.5 ml-2"} onClick={() => setAdmin(!admin)}></button>
                    </div>
                    <button className="p-2 bg-black text-white font-bold px-10 rounded-2xl my-5" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login