import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cal from "./CLDR"

export default function EnterCLDR() {
    const navigate = useNavigate();
    useEffect(() => {
        var storage = localStorage.getItem("employee");
        var employee = JSON.parse(storage);
        if(employee === null) {
            navigate("/login")
        }
    }
    ,[])
  return (
    <div>
        <Cal />
    </div>
  )
}
