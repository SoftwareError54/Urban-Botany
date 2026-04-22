import {Routes, Route} from "react-router-dom"
import UserRooms from '../RoomComponents/UserRooms'
import Room from '../RoomComponents/Room'
import RoomForm from '../RoomComponents/RoomForm'

function Rooms(){
        return (
              <div style={{background: 'var(--secondary)', minHeight: 'calc(100dvh - var(--topbar-height) - var(--navbar-height))', width: '100%', boxSizing: 'border-box'}}>
                <Routes>
                        <Route path="/" element={<UserRooms />} /> 
                        <Route path='room/:id' element={<Room/>}/>
                        <Route path="addroom" element={<RoomForm/>}/>
                </Routes>
            </div>
        )
}



export default Rooms;