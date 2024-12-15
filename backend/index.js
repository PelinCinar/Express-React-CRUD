import express from "express";
import bodyParser from "body-parser";
import usersRouter from "./routes/users.js";
import cors from "cors";

const app = express(); // Gelen HTTP isteklerini dinler ve cevaplar
//express() fonksiyonu, Express'in ana işlevselliğini sağlayan bir uygulama
app.use(cors()); // CORS middleware'i, tüm rotalardan önce kullanılmalı
//bir kaynağın (örneğin, frontend) başka bir kaynaktan (backend) veri almasına izin verir. 
// Eğer frontend ve backend farklı portlarda çalışıyorsa, CORS hatası alabilirsiniz
//biz axios sebebiyle bu hatayı almıştık sanıyorum
app.use(bodyParser.json());//body-parser middleware'i, gelen HTTP isteklerinde bulunan JSON verisini kolayca almak için kullanılır.


//yani biz index.js içeriisnde bodyParser kullanrak controller içerisinde req.body diyerek her birii için json mı şartlamış oluyoruz evet doğru anladım ulan


app.use("/users", usersRouter);
///users rotasındaki tüm istekleri usersRouter üzerinden yönlendiriyorsunuz.
app.use("*", (req, res) => {
  res.status(404).send("Page not Found");
});

const port = 5000; // Sunucunun hangi portta dinleyeceğini belirtir
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
