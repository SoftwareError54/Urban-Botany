// import PlantRoutes from './Routes/PlantRoute.js';
// import CareRequirementsRoute from './Routes/CareRequirementsRoute.js';
// import RoomRoute from './Routes/RoomRoute.js';
// import UserPlantRoute from './Routes/UserPlantRoute.js';
// import UserPlantDecorationRoute from './Routes/UserPlantDecorationRoute.js';
// import UserRoomDecorationRoute from './Routes/UserRoomDecorationRoute.js';
// import UserRoute from './Routes/UserRoute.js';
import express from 'express';
import dotenv from 'dotenv';




dotenv.config();

const app = express();
const PORT = 3000;




app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend updated + running!');
});

app.get('/rooms/:uid', (req, res) => {
  console.log('Received request for rooms with uid:', req.params.uid);
  res.send('rooms route');
});




app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});