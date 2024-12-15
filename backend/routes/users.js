import express from "express";

import { createUser, deleteUser, getSingleUser, getUsers, updateUser } from "../controllers/users.js";

const router = express.Router();//farklı HTTP isteklerini (GET, POST, DELETE, PUT) belirli rotalara yönlendirecek.

router.get("/", getUsers);//tüm kullanıcıları al
router.get("/:id", getSingleUser);//id parametresini kullan tek bir kullancıyı getir
router.post("", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

///:id: Parametre olarak id alıyorsunuz. Bu, dinamik bir rota oluşturmanızı sağlar. Yani her farklı id değeri için aynı fonksiyon çalışacaktır.


export default router;
 