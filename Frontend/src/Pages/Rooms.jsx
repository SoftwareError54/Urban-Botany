import {Routes, Route} from "react-router-dom"
import UserRooms from '../RoomComponents/UserRooms'
import Room from '../RoomComponents/Room'

function Rooms(){

    return(
    <Routes>
        <Route path="/" element={<UserRooms />} /> 
        <Route path='/rooms/room/:id' element={<Room/>}/>
    </Routes>
    
    )
}



export default Rooms;