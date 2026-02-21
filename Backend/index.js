// import PlantRoutes from './Routes/PlantRoute.js';
// import CareRequirementsRoute from './Routes/CareRequirementsRoute.js';
// import RoomRoute from './Routes/RoomRoute.js';
// import UserPlantRoute from './Routes/UserPlantRoute.js';
// import UserPlantDecorationRoute from './Routes/UserPlantDecorationRoute.js';
// import UserRoomDecorationRoute from './Routes/UserRoomDecorationRoute.js';
// import UserRoute from './Routes/UserRoute.js';
import express from 'express';
import dotenv from 'dotenv';
import RoomRoutes from './Routes/RoomRoutes.js';
import PlantRoutes from './Routes/PlantRoutes.js';
import UserPlantRoutes from './Routes/UserPlantRoutes.js';
import ProfileRoutes from './Routes/ProfileRoutes.js';


dotenv.config();

const app = express();
const PORT = 3000;
const router = express.Router();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend updated + running!');
});



app.use("/api", router);
app.use("/rooms",RoomRoutes);
app.use("/plants", PlantRoutes);
app.use("/userplants", UserPlantRoutes);
app.use("/profile", ProfileRoutes);



app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});