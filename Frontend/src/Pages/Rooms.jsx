import {Routes, Route} from "react-router-dom"
import UserRooms from '../RoomComponents/UserRooms'
import Room from '../RoomComponents/Room'
import RoomForm from '../RoomComponents/RoomForm'

function Rooms(){

    return(
    <Routes>
        <Route path="/" element={<UserRooms />} /> 
        <Route path='room/:id' element={<Room/>}/>
        <Route path="addroom" element={<RoomForm/>}/>
    </Routes>
    
    )
}



export default Rooms;