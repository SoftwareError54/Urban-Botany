import {Routes, Route} from "react-router-dom"
import UserRooms from '../RoomComponents/UserRooms'
import Room from '../RoomComponents/Room'
// import Plant from '../PlantComponents/Plant'
import PlantPage from '../PlantComponents/PlantPage'
import IdentifiedPlant from '../PlantComponents/IdentifiedPlant'


function Plants(){
    return(
        <Routes>
            <Route path="myplants/:id" element={<PlantPage/>}/>
            <Route path="identified" element={<IdentifiedPlant/>} />
            {/* <Route path="/myplants" element={<MyPlants/>}/>
            <Route path="searchplants" element={<SearchPlants/>}/> */}
        </Routes>
    )
}

export default Plants;