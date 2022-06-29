import React,{useState, useEffect} from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "./bigCalenderCSSFile.css"
import { compareSync } from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { isToday } from 'date-fns'
import { BiLogOut,BiShieldQuarter } from "react-icons/bi";


export default function Cal() {
  const navigate = useNavigate();


  useEffect(() => {
    getEmployeeData()
    
  }
  , [navigate]);
  const [date, setDate] = useState("")
  const [confirmWorkNumber, setConfirmWorkNumber] = useState("")
  const [confirmMessage, setConfirmMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [type, setType] = useState("")
  const [error, setError] = useState(false)
  const [myEvents, setMyEvents] = useState([])

  
    const locales = {
        'en-US': enUS,
      }
      
      const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      })


      const dateGetting = () => {
        return(date)
      
      }



      const getEmployeeData = async () => {
        const response = await fetch("http://localhost:5000/getEmployeeData")
        const data = await response.json()
        
        const allData = [].concat(...data)
        const evenData = [].concat(...allData)
        evenData.forEach(date => {
          if(date.holidayDates.length > 12) {
            const newDate = date.holidayDates.slice(4, 15)
            const newDate2 = newDate.replace(" ", "")
            const month = newDate2.slice(0, 3)
            const day = newDate2.slice(3, 5)
            const year = newDate2.slice(6, 10)
            const getMonth = () => {
            if(month === "Jan") {
              const newMonth = "1"
              return newMonth
            }
            else if(month === "Feb") {
              const newMonth = "2"
              return newMonth
            }
            else if(month === "Mar") {
              const newMonth = "3"
              return newMonth
            }
            else if(month === "Apr") {
              const newMonth = "4"
              return newMonth
            }
            else if(month === "May") {
              const newMonth = "5"
              return newMonth
            }
            else if(month === "Jun") {
              const newMonth = "6"
              return newMonth
            }
            else if(month === "Jul") {
              const newMonth = "7"
              return newMonth
            }
            else if(month === "Aug") {
              const newMonth = "8"
              return newMonth
            }
            else if(month === "Sep") {
              const newMonth = "9"
              return newMonth
            }
            else if(month === "Oct") {
              const newMonth = "10"
              return newMonth
            }
            else if(month === "Nov") {
              const newMonth = "11"
              return newMonth
            }
            else if(month === "Dec") {
              const newMonth = "12"
              return newMonth
            }
          }


            const title = date.holidayTypes
            const division = date.holidayDivision
            console.log(division)
            const type = title.toString()
            const startDate = [parseInt(year), parseInt(getMonth()), parseInt(day)]
            const endDate = [parseInt(year), parseInt(getMonth()), parseInt(day)]
            const storage = localStorage.getItem("employee");
            const employee = JSON.parse(storage);
            if(employee.division === division) {
              const event = {
                title: type,
                start: startDate,
                end: endDate,
                allDay: true,
                id: 1,
              }
              setMyEvents(prevEvents => [...prevEvents,event])
            } else {
              console.log("not in division")
            }

            

          }


        })
        
      
      }



      
    
    
      const confirmAddHoliday = () => {
        var token = localStorage.getItem("employee")
        var employee = JSON.parse(token)
        const date = dateGetting()
        console.log(confirmWorkNumber)
        var workNumber = employee.workNumber
        if (confirmWorkNumber === workNumber) {
            setConfirmMessage(true)
            if(date === "Error") {
              setErrorMessage("Please select a different date")
              setError(true)
              setConfirmMessage(false)
            }
            else {
              setError(false)
              setErrorMessage("")
              setConfirmWorkNumber("")
            }
        } else {
            setConfirmMessage(false)
            setErrorMessage("Work number is not matching")
            setError(true)
        }
    
    
      }
      
      const AddHoliday = async () => {
        var token = localStorage.getItem("employee")
        var employee = JSON.parse(token)
        setConfirmMessage(false)
        var workNumber = employee.workNumber
        var division = employee.division
        var date = dateGetting()
        const item = () => {
          if(type === "") {
            return "Full Day"
          }
          else {
            return "Half Day"
          }
        }

      
          try {
              const response = await fetch(`http://localhost:5000/addHoliday`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      workNumber: workNumber,
                      date: date,
                      division: division,
                      type: item(),
                  })
              });
              const data = await response.json();
              window.location.reload()
              console.log(data)
              setErrorMessage("")
              setError(false)
              setConfirmMessage(false)
              setConfirmWorkNumber("")
              
      
          } catch (error) {
              console.log(error)
              setErrorMessage("Error adding holiday")
              setError(true)
              setConfirmMessage(false)
              setConfirmWorkNumber("")
          }
        
    
    
        
      }
      
    const myHolidaysNav = () => {
      navigate("/myHolidays")
    }

    const logOut = () => {
      localStorage.removeItem("employee")
      navigate("/login")
    }
  const checkAdminMove = () => {
    var token = localStorage.getItem("employee")
    var employee = JSON.parse(token)
    try{ 
      if(employee.admin === true) {
        return(
          <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
            <BiShieldQuarter className="w-8 h-8 cursor-pointer" onClick={()=> navigate("/admin")}/>
          </div>
        )
      }
    }
    catch(error) {
      console.log(error)
    }
    
    
  }
  return (
    <>
    <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
      <BiLogOut className="w-8 h-8 cursor-pointer" onClick={() => logOut()}/>
    </div>
    {checkAdminMove()}
    <div className={confirmMessage ? "w-full absolute m-auto h-full" : "w-full h-full hidden m-auto"}>
        <div className="w-2/5 bg-blue-500 p-10 pt-20 absolute grid place-content-bottom left-1/2 top-2/4  z-10  transform -translate-x-1/2 translate-y-20 -mt-1 ">
            <h1 className="text-white font-bold text-lg text-center">Confirm your holidays</h1>
            <h1 className="text-white text-sm text-center">Please make sure to check the year, month and day.</h1>
            <div className="grid place-content-center gap-1 md:grid-cols-2">
                <button className="p-2 px-5 bg-blue-500 text-white font-semibold mt-5 m-3 border-2 " onClick={() => AddHoliday()}>CONFIRM</button>
                <button className="p-2 px-5 bg-blue-500 text-white font-semibold mt-5 m-3 border-2" onClick={() => setConfirmMessage(!confirmMessage)}>CANCEL</button>
            </div>
        </div>
    </div>
  <div className="grid place-content-center gap-1 md:grid-cols-1">
    {error ? <h1 className="bg-red-600 text-white w-full align-center rounded-t-md text-center font-semibold py-1">{errorMessage}</h1> : <div className="hidden"></div>}
        <div className="hidden md:inline-flex my-20 mx-auto shadow rounded-sm w-2/5 justify-center">
        
            <div className="flex flex-col items-center justify-center w-full">
            <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      events={myEvents}

      
      onSelectSlot={(slotInfo) => {
        var slot = slotInfo.start
        var slotString = slot.toString().substring(0, 15)
        const newDate = slotString.slice(4, 15)
            const newDate2 = newDate.replace(" ", "")
            const month = newDate2.slice(0, 3)
            const day = newDate2.slice(3, 5)
            const year = newDate2.slice(6, 10)
            const getMonth = () => {
            if(month === "Jan") {
              const newMonth = "1"
              return newMonth
            }
            else if(month === "Feb") {
              const newMonth = "2"
              return newMonth
            }
            else if(month === "Mar") {
              const newMonth = "3"
              return newMonth
            }
            else if(month === "Apr") {
              const newMonth = "4"
              return newMonth
            }
            else if(month === "May") {
              const newMonth = "5"
              return newMonth
            }
            else if(month === "Jun") {
              const newMonth = "6"
              return newMonth
            }
            else if(month === "Jul") {
              const newMonth = "7"
              return newMonth
            }
            else if(month === "Aug") {
              const newMonth = "8"
              return newMonth
            }
            else if(month === "Sep") {
              const newMonth = "9"
              return newMonth
            }
            else if(month === "Oct") {
              const newMonth = "10"
              return newMonth
            }
            else if(month === "Nov") {
              const newMonth = "11"
              return newMonth
            }
            else if(month === "Dec") {
              const newMonth = "12"
              return newMonth
            }
          }
          const slotDate = [parseInt(year), parseInt(getMonth()), parseInt(day)]


          var eventArray = []

          for(var i = 0; i < myEvents.length; i++) {
            var event = myEvents[i].start
            eventArray.push([...event])
            
            
          }
          console.log(eventArray)
          if (eventArray.length === 0) {
            setErrorMessage("")
            setError(false)
            var tile = slotInfo.start
            var tileString = tile.toString().substring(0, 15)
            setDate(tileString)
            console.log(date)
          }
          else {
          
          for(var x = 0; x < eventArray.length; x++) {
            var eventDate = eventArray[x]
            console.log(eventDate + "eventDate")
            console.log(slotDate + "slotDate")
            var evD = eventDate.toString();
            var slD = slotDate.toString();
            if(evD === slD) {
              
              setErrorMessage("Sorry there is already a holiday on this day")
              setError(true)
              setDate("Error")
              return
            }

            else {
              setErrorMessage("")
              setError(false)
              var tilea = slotInfo.start
              var tileStringa = tilea.toString().substring(0, 15)
              setDate(tileStringa)
              console.log(date)
            }
          }
          }
          



        
        
        
    }}

    style={{ height: 500 }}
        eventPropGetter={(event, start, end, isSelected) => ({
          event,
          start,
          end,
          isSelected,
          style: { backgroundColor: "red" }

        })}
        view={'month'}
    selectable
    className="w-full"
    />

                <div className="grid place-content-center gap-1 md:grid-cols-1 mt-10 w-3/6">
                        <p className="font-bold text-black text-center text-md" >{dateGetting()}</p>


                        <select onChange={(e) => setType(e.target.value)} className="outline-none">
                            <option value="Full Day">Full Day</option>
                            <option value="Half Day">Half Day</option>
                          </select>
                        <input onChange={(e) => setConfirmWorkNumber(e.target.value)} type="number" placeholder="Please confirm your work number to add this holiday" className="placeholder:italic placeholder:text-slate-400 block h-10 bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-0.5 sm:text-sm mb-3 text-left"/>
                        <button className="p-2 px-12 bg-black text-white font-bold m-3 hover:m-2.5 hover:border-2 hover:border-black hover:bg-white hover:text-black" onClick={() => confirmAddHoliday()}>ADD HOLIDAY</button>
                        <button className="text-center text-black border-2 border-black p-2 px-12 font-bold text-md m-3 hover:bg-black hover:text-white" onClick={() => myHolidaysNav()}>My Holidays</button>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
}
