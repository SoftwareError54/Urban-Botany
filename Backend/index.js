// import PlantRoutes from './Routes/PlantRoute.js';
// import CareRequirementsRoute from './Routes/CareRequirementsRoute.js';
// import RoomRoute from './Routes/RoomRoute.js';
// import UserPlantRoute from './Routes/UserPlantRoute.js';
// import UserPlantDecorationRoute from './Routes/UserPlantDecorationRoute.js';
// import UserRoomDecorationRoute from './Routes/UserRoomDecorationRoute.js';
// import UserRoute from './Routes/UserRoute.js';
import express from 'express';
import dotenv from 'dotenv';
import AuthRoute from './Routes/Auth.js';
import ProfileRoute from './Routes/Profile.js';
import RoomRoute from './Routes/Room.js';



dotenv.config();

const app = express();
const PORT = 3000;




app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend updated and running!');
});

app.use('/api/auth', AuthRoute);
app.use('/api/profile', ProfileRoute);
app.use('/api/rooms', RoomRoute);
// app.use('/api/plant',PlantRoutes);
// app.use('/api/care-requirements',CareRequirementsRoute);
// app.use('/api/room',RoomRoute);
// app.use('/api/user-plants',UserPlantRoute);
// app.use('/api/user-room-decorations',UserRoomDecorationRoute);
// app.use('/api/user',UserRoute);
// app.use('/api/user-plant-decorations',UserPlantDecorationRoute);

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});