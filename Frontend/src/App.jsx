import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Rooms from './Rooms/rooms';
import Room from './Rooms/room';
import './App.css'

export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:roomId" element={<Room />} />
    </Routes>
    </BrowserRouter>
  )
}
  
