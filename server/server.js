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

<<<<<<< HEAD
server.listen(process.env.PORT || 4000, (req, res) => {
    console.log(`Server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})
=======
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
})
>>>>>>> 779a40761ebe0b6e1ee55785e975ced7bc7d5e07
