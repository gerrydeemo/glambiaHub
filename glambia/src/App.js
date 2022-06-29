import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Admin from './Admin/Admin';
import EnterCLDR from './User/EnterCLDR';
import Login from "./Auth/Login";
import MyHolidays from "./User/MyHolidays"
import Register from "./Auth/Register";
import EmployeeHolidays from "./Admin/EmployeeHolidays";

function Routing() {


  return (
      <Routes>
        <Route path="/" element={<EnterCLDR />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myholidays" element={<MyHolidays />} />
        <Route path="/employeeHolidays" element={<EmployeeHolidays />} />
        <Route path="/register" element={<Register />} />
      </Routes>

  )
}













function App() {
  return (
    <Router>
      <Routing/>
    </Router>
  )
}

export default App

