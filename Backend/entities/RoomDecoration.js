//Matches room_decoration table
class RoomDecoration{
    constructor(roomDecorationID, imagePointer, isStatic, type, cost, colour1, colour2){
        this.roomDecorationID = roomDecorationID,
        this.imagePointer = imagePointer,
        this.isStatic = isStatic,
        this.type = type,
        this.cost = cost,
        this.colour1 = colour1,
        this.colour2 = colour2
    }
}
export default RoomDecoration;