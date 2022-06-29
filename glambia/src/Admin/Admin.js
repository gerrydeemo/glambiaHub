import { useNavigate} from "react-router-dom"
import React, {useEffect, useState} from 'react';
import { BiLogOut, BiLeftArrowAlt} from "react-icons/bi";




function Admin() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("employee")
    navigate("/login")
  }
  useEffect(() => {
    var storage = localStorage.getItem("employee");
    var employee = JSON.parse(storage);
    

    if (employee === null) {
      navigate("/login");
    }
    else if (employee.admin === true) {
      navigate("/admin");
    }
    else {
      navigate("/");

    }
  }
  , [navigate]);

  const clearStorage = () => {
    localStorage.clear();
    navigate("/login");
  }
  const back = () => {
    navigate("/");
  }

  const register = () => {
    navigate("/register");
  }
  const employeeHolidays = () => {
    navigate("/employeeHolidays");
  }
  return (
    <div className="w-full">
    <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
      <BiLogOut className="w-8 h-8 cursor-pointer" onClick={() => logOut()}/>
    </div>
    <div className="w-16 bg-black text-white hover:bg-white hover:text-black p-3 inline-flex">
      <BiLeftArrowAlt className="w-8 h-8 cursor-pointer" onClick={() => back()}/>
    </div>
      <div className="container mx-auto w-full text-center list-disc translate-y-3/4 mt-10">
        <div className="w-1/4 bg-black  border-2 border-black text-white hover:bg-white hover:text-black p-3 px-3/4 inline-flex hover:border-2 hover:border-black cursor-pointer">
          <h1 className="text-center m-auto font-bold" onClick={() => employeeHolidays()}>Employee Holidays</h1>
        </div><br/><br/>
        <div className="w-1/4 bg-black text-white border-2 border-black hover:bg-white hover:text-black p-3 px-3/4 inline-flex hover:border-2 hover:border-black cursor-pointer">
          <h1 className="text-center m-auto font-bold" onClick={() => register()}>Register</h1>
        </div>
      </div>
    </div>
  );
}

export default Admin;
