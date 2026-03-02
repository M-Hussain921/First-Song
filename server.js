import express from "express";
import mongoose from "mongoose";

import auth from "./router/auth.router.js";
import admin  from "./router/admin.router.js";
import artist from "./router/artist.router.js";

import "./config/cloudinary.js";

const app = express();
app.use(express.json());

app.use("/auth", auth);
app.use("/admin", admin);
app.use("/artist", artist);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo DB is connected");
    app.listen(process.env.PORT, () => console.log(`server is running at http://localhost:${process.env.PORT}`));
  })
  .catch((err) => console.log("MongoDB connecting error", err));