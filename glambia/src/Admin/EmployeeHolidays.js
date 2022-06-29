import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { BiLogOut, BiLeftArrowAlt} from "react-icons/bi";


export default function EmployeeHolidays() {
    const [employeeWorkNumber, setEmployeeWorkNumber] = useState([])
    const [employeeHolidays, setEmployeeHolidays] = useState([])
    const [employeeDivision, setEmployeeDivision] = useState([])
    const [employeeType, setEmployeeType] = useState([])
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("employee")
        navigate("/login")
    }

    const getEmployeeHolidaysDivisionType = async () => {
        await fetch("http://localhost:5000/empdivtype", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(data => {
            const allData = [].concat(data)
            allData.map(employee => {
                    var workNumber = employee.workNumber
                    var division = employee.division
                    var holidays = employee.holidays.map(holiday => {
                        var date = holiday.date 
                        var type = holiday.title
                        return(
                            type + ": " + date
                        )
                    })


                    setEmployeeHolidays(prevHolidays => [...prevHolidays, holidays])
                    setEmployeeWorkNumber(prevWorkNumbers => [...prevWorkNumbers,workNumber])
                    setEmployeeDivision(prevDivisions => [...prevDivisions,division])
                    // setEmployeeHolidays(prevHolidays => [...prevHolidays,holidays])
                }
            )

        }
        )
    }
    const getWorkNumber = () => {
        var emnums = employeeWorkNumber.length
        var wnum = employeeWorkNumber.slice(employeeWorkNumber, emnums / 2)
        return wnum
    }
    const getDivisions = () => {
        var emnums = employeeDivision.length
        var wnum = employeeDivision.slice(employeeDivision, emnums / 2)
        return wnum
    }
    const getHolidays = () => {
        var emnums = employeeHolidays.length
        var wnum = employeeHolidays.slice(employeeHolidays, emnums / 2)
        return wnum
    }


                  
    
    useEffect(() => {
        getEmployeeHolidaysDivisionType()
        var storage = localStorage.getItem("employee");
        var employee = JSON.parse(storage);
        
    
        if (employee === null) {
            navigate("/login");
        }
        else if (employee.admin === true) {
            navigate("/employeeHolidays");
        }
        else {
            navigate("/");
        }
    }
    , [navigate]);

    const back = () => {
        navigate("/admin");
    }



    return (
        <div className="w-full">
            <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
                <BiLogOut className="w-8 h-8 cursor-pointer" onClick={() => logOut()}/>
            </div>
            <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
                <BiLeftArrowAlt className="w-8 h-8 cursor-pointer" onClick={() => back()}/>
            </div>
            <div className="flex justify-center align-center">
                <div className="bg-black inline-flex">
                    <div className="text-white text-center p-10" >
                    <h1 className="text-lg font-semibold">Work Number</h1>
                    <hr/>
                    {getWorkNumber().map(worknumber => {
                            return (
                                <div >
                                    <h1>{worknumber}</h1>
                                </div>
                            )
                        }
                        )
                        }
                        </div>
                        <div className="text-white text-center p-10" >
                    <h1 className="text-lg font-semibold">Division</h1>
                    <hr/>
                        {getDivisions().map(division => {
                            return (
                                <div>
                                    <h1>{division}</h1>
                                </div>
                            )
                        }
                        )
                        }
                        </div>
                        <div className="text-white text-left p-10" >
                        <h1 className="text-lg font-semibold text-center">Holidays</h1>
                        <hr/>
                            {
                                getHolidays().map(holiday => {
                                    return (
                                        <div>
                                            <h1>{holiday + " "}</h1>
                                        </div>
                                    )
                                    
                                })
                            }
                            
                        </div>
                    </div>
            </div>
        </div>
    )
}


