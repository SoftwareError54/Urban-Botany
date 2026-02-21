import roomService from "../Services/RoomsService.js";

export async function getRoomsByUserId(req,res){
    try{
        const userId = req.params.uid;
        const rooms = await roomService.getRoomsByUserId(userId);

        if(!rooms || rooms.length === 0){
            return res.status(404).json({message: "No rooms found for this user"});
        }
        res.json(rooms);
    } catch(error){
        res.status(500).json({message: "Error fetching rooms", error: error.message});
    }
}

export async function getRoomById(req,res){
    try{
        const roomId = req.params.roomId;
        const room = await roomService.getRoomById(roomId);
        if(!room){
            return res.status(404).json({message: "Room not found"});
        }
        res.json(room);
    } catch(error){
        res.status(500).json({message: "Error fetching room", error: error.message});
    }
}