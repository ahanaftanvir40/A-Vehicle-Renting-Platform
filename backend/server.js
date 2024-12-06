import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import "./config/mongoose-connection.js";
import { connect } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import http from "http";

dotenv.config();
connect()
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//routes
app.use("/api", userRoutes);


const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("homepage");
});


server.listen(port, () => {
  console.log(`server is running on ${port}`);
});