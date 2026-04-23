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
import AuthRoutes from './Routes/Auth.js';
import PlantRoutes from './Routes/PlantRoutes.js';
import UserPlantRoutes from './Routes/UserPlantRoutes.js';
import ProfileRoutes from './Routes/ProfileRoutes.js';
import ShopRoutes from './Routes/ShopRoutes.js';


dotenv.config();

console.log('[startup] imports loaded, PORT env:', process.env.PORT);

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();


// Allow larger JSON payloads so base64 images can be posted from the frontend
app.use(express.json({ limit: '10mb' }));

// Basic request logger to help diagnose routing issues
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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
app.use('/auth', AuthRoutes);
app.use("/plants", PlantRoutes);
app.use("/userplants", UserPlantRoutes);
app.use("/profile", ProfileRoutes);
app.use("/shop", ShopRoutes);

// Generic error handler so uncaught errors return JSON instead of crashing the process silently
app.use((err, req, res, next) => {
  console.error('Unhandled error in request pipeline:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: 'Internal server error', error: err?.message });
});

// Log unhandled promise rejections and uncaught exceptions to help debugging
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});




console.log('[startup] about to call app.listen on port', PORT);
app.listen(PORT, () => {
  console.log(`[startup] Backend listening on port ${PORT}`);
});