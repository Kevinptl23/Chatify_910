import app from "./app.js";
import {v2 as cloudinary} from 'cloudinary';
import http from 'http';
import { initSocket } from "./utils/socket.js";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = http.createServer(app);
initSocket(server);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
})
