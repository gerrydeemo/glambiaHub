import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { BiLogOut, BiLeftArrowAlt} from "react-icons/bi";

function Register() {
  const [passType, setPassType] = useState(false);
    const [workNumber, setWorkNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorShow, setErrorShow] = useState(false);
    const [division, setDivision] = useState("");
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(false); 
    const [good, setGood] = useState("");
    const [goodShow, setGoodShow] = useState(false);

  useEffect(() => {
    var storage = localStorage.getItem("employee");
    var employee = JSON.parse(storage);
    

    if (employee === null) {
      navigate("/login");
    }
    else if (employee.admin === true) {
      navigate("/register");
    }
    else {
      navigate("/");

    }
  }
  , [navigate]);
  const back = () => {
    navigate("/admin");
  }
  const logOut = () => {
    localStorage.removeItem("employee")
    navigate("/login")
  }
  const handleSubmit = () => {
    console.log("submit")
    if (workNumber === "" || password === "" || division === "") {
      setError("Please fill in all fields")
      setErrorShow(true)
    }
    else {
      setErrorShow(false)
      setError("")
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          workNumber: workNumber,
          password: password,
          division: division,
          admin: admin
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) {
          setErrorShow(true)
          setError(data.error)
        }
        else {
          setErrorShow(false)
          setError("")
          setGoodShow(true)
          setGood("Registration successful")
          setWorkNumber("")
          setPassword("")
          setDivision("")
        }
      }
      )
    }

  }
  return (
    <div className="w-full">
    <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
      <BiLogOut className="w-8 h-8 cursor-pointer" onClick={() => logOut()}/>
    </div>
    <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
      <BiLeftArrowAlt className="w-8 h-8 cursor-pointer" onClick={() => back()}/>
    </div>
    <div className="grid place-content-center gap-1 md:grid-cols-1">
        <div className="hidden md:inline-flex my-20 mx-auto shadow rounded-sm w-2/5 justify-center">
            <div className="flex flex-col items-center justify-center w-full">
            {errorShow ? <h1 className="bg-red-600 text-white w-full align-center rounded-t-md text-center font-semibold py-1">{error}</h1> : null}
            {goodShow ? <h1 className="bg-sky-600 text-white w-full align-center rounded-t-md text-center font-semibold py-1">{good}</h1> : null}
                <h1 className="text-2xl font-semibold mb-8">Register A Employee</h1>
                    <input onChange={(e) => setWorkNumber(e.target.value)} className="w-4/5 placeholder:italic placeholder:text-slate-400 block bg-white w-full border h-10 border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-0.5 sm:text-sm mb-3" placeholder="Enter employee work number" type="text" name="worknum"/>
                    <input onChange={(e) => setPassword(e.target.value)} className="w-4/5 placeholder:italic placeholder:text-slate-400 block bg-white w-full border h-10 border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-0.5 sm:text-sm mb-3" placeholder="Enter employee password" type="text" name="worknum"/>
                    <input onChange={(e) => setDivision(e.target.value)} className="w-4/5 placeholder:italic placeholder:text-slate-400 block bg-white w-full border h-10 border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-0.5 sm:text-sm mb-3" placeholder="Enter employee division" type="text" name="worknum"/>
                    <div className="w-4/5 inline-flex">
                        <h1 className="text-sm ">Click this box if employee will be admin staff e.g. manager.</h1>
                        <button className={admin ? "border-2 border-black bg-black w-4 h-4 mt-0.5 ml-2" : "border-2 border-black bg-white w-4 h-4 mt-0.5 ml-2"} onClick={() => setAdmin(!admin)}></button>
                    </div>
                    <button className="p-2 bg-black text-white font-bold px-10 rounded-2xl my-5" onClick={handleSubmit}>Register</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Register