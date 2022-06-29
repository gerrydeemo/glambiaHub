import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { BiLogOut, BiLeftArrowAlt} from "react-icons/bi";

export default function MyHolidays() {
    const [myData, setMyData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getMyData()
        var storage = localStorage.getItem("employee");
        var employee = JSON.parse(storage);
    
        if (employee === null) {
          navigate("/login");
        }
        else {
          navigate("/myholidays");
    
        }
      }
      , [navigate]);
      const getMyData = async () => {  
        var storage = localStorage.getItem("employee");
        var employee = JSON.parse(storage); 
        const response = await fetch("http://localhost:5000/getMyData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                workNumber: employee.workNumber
            })
        });
        const data = await response.json();
        console.log(data)
        setMyData(data)


        
      }

    const deleteHoliday = (e) => {
        e.preventDefault();
        var storage = localStorage.getItem("employee");
        var employee = JSON.parse(storage);
        var holiday = e.target.date.value
        console.log(holiday)
        console.log("deleteHoliday")
        fetch("http://localhost:5000/deleteHoliday", {

            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                workNumber: employee.workNumber,
                date: holiday
            })
        });
        getMyData()
     

    }
    const logOut = () => {
      localStorage.removeItem("employee")
      navigate("/login")
    }
  return (
    <div>
    <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
      <BiLogOut className="w-8 h-8 cursor-pointer" onClick={() => logOut()}/>
    </div>
    <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
      <BiLeftArrowAlt className="w-8 h-8 cursor-pointer" onClick={() => navigate("/")}/>
    </div>
    <h1 className="font-bold mr-5 text-2xl text-center mt-5">My Holidays</h1>
    {myData.map(data =>
        <div className="w-11/12 m-auto mt-10 text-center ">
                <form className="inline-flex " onSubmit={deleteHoliday}>
                    <div className="border-black inline-flex border-2 px-5">
                        <div className="w-2 h-2 rounded-full bg-black mt-6 mr-3"></div>
                        <input className="font-bold mr-5 text-xl" value={data.title}/>
                        <input className="text-xl" name="date" value={data.date}/>
                        <input className="cursor-pointer text-center border-2 text-white border-black bg-black  p-0.5 px-5 font-bold text-md m-3 hover:text-black hover:bg-white" type="submit" value="Delete"/>
                    </div>
                </form>
        </div>
    )}
    </div>
  )
}
