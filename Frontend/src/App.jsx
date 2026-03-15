// import { useState } from 'react'
import Rooms from "./Pages/Rooms.jsx"
import Calendar from "./Pages/Calendar.jsx"
import LandingPage from "./Pages/LandingPage.jsx"
import {Routes, Route} from "react-router-dom"
import MainLayout from "./layouts/MainLayout.jsx"



import './App.css'


export default function App(){
  return(
    <main className="main-content">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<MainLayout/>}>
          <Route path="/Rooms/*" element={<Rooms />} />
          <Route path="/Profile" element={<h1>Profile</h1>} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Projects" element={<h1>Projects</h1>} />
          <Route path="/Scan" element={<h1>Scan</h1>} />
        </Route> 
      </Routes>
    </main>
  )
}


