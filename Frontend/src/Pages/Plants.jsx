import {Routes, Route} from "react-router-dom"
import UserRooms from '../RoomComponents/UserRooms'
import Room from '../RoomComponents/Room'
// import Plant from '../PlantComponents/Plant'



function Plants(){
    return(
        <>
            <h1>Plant Name</h1> 
            <p>Plant Image</p>
            <div>
                <p>Common Name</p>
                <p>Latin Name</p>
            </div>
            <p>Watering Task Bar</p>
            <div>
                <p>Light Level</p>
                <p>Watering Frequency</p>
                <p>Care Difficulty</p>
                <p>Temperature Range</p>
                <p>Recommended Room</p>
            </div>
        </>
    )
}

export default Plants;