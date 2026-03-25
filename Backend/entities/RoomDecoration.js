//Matches room_decoration table
class RoomDecoration{
    constructor(roomDecorationID, decorationName, imagePointer, isStatic, layer, cost, colour1, colour2){
        this.roomDecorationID = roomDecorationID,
        this.decorationName = decorationName,
        this.imagePointer = imagePointer,
        this.isStatic = isStatic,
        this.layer = layer,
        this.cost = cost,
        this.colour1 = colour1,
        this.colour2 = colour2
    }
}
export default RoomDecoration;