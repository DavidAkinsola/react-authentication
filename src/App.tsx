// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { Button } from "@/components/ui/button"
import Register from "./views/auth/Register";
import Login from './views/auth/Login';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Routes,
  BrowserRouter,
} from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="auth" element={<Login />} ></Route>
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
   
         
  )
}

export default App
