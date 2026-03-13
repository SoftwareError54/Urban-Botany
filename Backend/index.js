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

// Simple CORS middleware for development
app.use((req, res, next) => {
  const allowedOrigin = 'http://localhost:5173';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    return res.sendStatus(200);
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Backend updated + running!');
});

app.get("/logout", (req,res) => {
  res.clearCookie('token');
  res.status(200).json({message: 'Logged out successfully'});
});


app.use("/api", router);
app.use("/rooms",RoomRoutes);
app.use("/plants", PlantRoutes);
app.use("/userplants", UserPlantRoutes);
app.use("/profile", ProfileRoutes);




app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});