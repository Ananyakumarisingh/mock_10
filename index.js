const express = require("express");
const connectToMongo = require("./config/db");
const userRouter = require("./routes/user_routes");
require("dotenv").config();
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors')
const PORT = process.env.PORT;



const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const server = http.createServer(app);
const io = socketio(server);
io.on("connection",(server) =>{
    console.log("one client joined");
})






app.use("/api", userRouter);

app.get("/", (req, res) => {
    res.send("Welcome");
});


server.listen(PORT, async() => {
    console.log(`Server is running on ${PORT}`);
    try {
        await connectToMongo();
        console.log(`Running @ PORT ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})

// app.listen(PORT, async()=>{
// })


