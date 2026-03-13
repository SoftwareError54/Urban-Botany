import RoomButton from '../RoomComponents/RoomCard';
import NavBar from '../GlobalComponents/NavBar';

function Rooms(){
    return(
    <>
        <div>
            <h1>Rooms</h1>
            <button>Shop</button>
        </div>
        
        <main>
        <ul>
            <li>
                <RoomButton roomName="Kitchen" />
            </li>
            <li>
                <RoomButton roomName="Living Room" />
            </li>
            <li>
                <RoomButton roomName="Bedroom" />
            </li>
            <li>
                <button>+</button>
            </li>
        </ul>
        </main>
    </>
    )
}

export default Rooms;