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
export async function getAllRoomDecorations(req, res){
    try{
        const decorations = await roomService.getAllRoomDecorations();
        if (!decorations){
            return res.status(404).jso({message: "No Decorations Found"});
        }
        res.json(decorations);
    } catch(error){
        res.status(500).json({message: "Error Fetching Decorations"})
    }
}

export async function getRoomDecorationById(req, res){
    try{
        const decorationId = req.params.decorationId;
        const decoration = await roomService.getRoomDecorationById(decorationId);
        if (!decoration){
            return res.status(404).json({message: "No decoration found with id", decorationId});
        }
        res.json(decoration)
    }catch (error){
        res.status(500).json({message: "Failed to fetch decoration"});
    }
}

export async function getDecorationsByRoomId(req, res){
    try{
        const roomId = req.params.roomId;
        const decoration = await roomService.getDecorationsByRoomId(roomId);
        if (!decoration){
            return res.status(404).json({message: "No Decoration found for this room"});
        }
        res.json(decoration);
    } catch(error){
        res.status(500).json({message: "Failed to fetch decorations"});
    }
}


export async function addDecoration(req, res){
    try{
        const decorationId = req.params.decorationId;
        const roomId = req.params.roomId;
        const decoration = await roomService.addDecoration(decorationId, roomId);
        if (!decoration){
            return res.status(404).json({message: "No decoration and/or room found"});
        }
        res.json(decoration);
    } catch(error){
        res.status(500).json({message: "Failed to add decoration"});
    }
}