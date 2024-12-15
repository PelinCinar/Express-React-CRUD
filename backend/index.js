import express from "express";
import bodyParser from "body-parser";
import usersRouter from "./routes/users.js";
import cors from "cors";

const app = express(); // Gelen HTTP isteklerini dinler ve cevaplar
app.use(cors()); // CORS middleware'i, tüm rotalardan önce kullanılmalı
app.use(bodyParser.json());

app.use("/users", usersRouter);

app.use("*", (req, res) => {
  res.status(404).send("Page not Found");
});

const port = 5000; // Sunucunun hangi portta dinleyeceğini belirtir
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
