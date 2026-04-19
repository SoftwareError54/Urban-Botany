// import { useState } from 'react'
import Rooms from "./Pages/Rooms.jsx"
import Calendar from "./Pages/Calendar.jsx"
import Landing from "./Pages/Landing.jsx"
import AuthPage from "./Pages/AuthPage.jsx"
import {Routes, Route} from "react-router-dom"
import MainLayout from "./layouts/MainLayout.jsx"
import Plants from "./Pages/Plants.jsx"
import Scan from "./Pages/Scan.jsx"
import Profile from "./Pages/Profile.jsx"



import './App.css'


export default function App(){
  return(
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<MainLayout/>}>
          <Route path="/rooms/*" element={<Rooms />} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Projects" element={<h1>Projects</h1>} />
          <Route path="/Scan/*" element={<Scan />} />
          <Route path="/plants/*" element={<Plants/>}/>
        </Route> 
      </Routes>
    </main>
  )
}


