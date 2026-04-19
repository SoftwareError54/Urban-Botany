import {Routes, Route} from "react-router-dom"
import UserRooms from '../RoomComponents/UserRooms'
import Room from '../RoomComponents/Room'
import RoomForm from '../RoomComponents/RoomForm'

function Rooms(){
        return (
              <div style={{background: 'var(--secondary)', minHeight: '100vh', width: '100%', boxSizing: 'border-box', padding: '2rem'}}>
                <Routes>
                        <Route path="/" element={<UserRooms />} /> 
                        <Route path='room/:id' element={<Room/>}/>
                        <Route path="addroom" element={<RoomForm/>}/>
                </Routes>
            </div>
        )
}



export default Rooms;