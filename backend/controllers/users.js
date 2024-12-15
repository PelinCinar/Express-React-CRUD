import { v4 as uuid } from "uuid";

let users = [
  {
    id: uuid(), //uid atarak benzersiz bir ID tanımladık kardeşim
    name: "Pelin",
    email: "pelincinar@gmail.com",
    country: "Turkey",
    contact: "531313131",
  },
  {
    id: uuid(),
    name: "Anil",
    email: "aniltarar@gmail.com",
    country: "Turkey",
    contact: "54242424242",
  },
];

//Bu, bir GET isteği (tarayıcıdan bir URL'yi ziyaret ettiğinizde oluşan istek türü) için bir endpoint tanımlar.
export const getUsers = (req, res) => {
  res.send(users); //geri döndürmek istediğimiz veriyi yazdık
}; //kullanıcıları gönderdik

//req: Request (İstemci tarafından gönderilen istek verilerini temsil eder).//url içerisindeki parametreleri alır
//res: Response (Sunucunun istemciye geri döndüğü yanıtı temsil eder).
//users ise gönderilecek veri oluyor

export const getSingleUser = (req, res) => {
  const id = req.params.id; //urlden gelen ID'yi alıyoruz.
  const user = users.find((u) => u.id === id); //users dizisi içinde id ile eşleşen kullancııyı bul dedik
  if (!user) {
    res.status(400).send("User not found!");
  }
  res.send(user); //bulduğun kullanıcıyı yanıt olarak döndür
}; //eğer kullanıcı varsa bunu json formatında istemciye gönderir.

export const createUser = (req, res) => {
  const { name, email, country, contact } = req.body; // req.body'den gelen verilerle yeni bir kullanıcı oluşturup listeye ekler

  const user = {
    id: uuid(),
    name: name,
    email: email,
    country: country,
    contact,
  };
  users.push(user); //oluşturudumuz kullanıcı yani userı users'a pushlaa diyoruz ve  push() metodu, user objesini users dizisinin sonuna ekler
  res.send("Yeni kullanıcı oluşturuldu");
};

export const deleteUser = (req, res) => {
  const id = req.params.id; //silinecek kullanıcının ID'sini alıyoruz.
  const user = users.find((u) => u.id === id);
  users = users.filter((u) => u.id !== id); //filter yeni bir diziye atmış gibi davranıyor ama ortada farklı bir dizi yaratmıyoruz bomboş dönerek o datanın hiç var olmamış gibi davranmasını sağlıyoruz

  //filter() fonksiyonu, gerçekten yeni bir dizi yaratmaz, ancak şu şekilde işler.Eski diziyi değiştirmez.
  //Koşula uyan öğeleri alıp yeni bir dizi oluşturur.
  //Koşula uymayan öğeler dışlanır, yani o öğeler "silinmiş" gibi davranır

  if (!user) {
    res.status(400).send("User Not Found");
  }
  res.send(users);
};

export const updateUser = (req, res) => {
  const id = req.params.id; 
  const user = users.find((u) => u.id === id);// find() metodu ile, users dizisinde id'si eşleşen olan kullanıcıyı buluyoruz.
  const { name, email, country, contact } = req.body; // istekle gönderilen verileri alıyoruz. req.body, POST, PUT, veya PATCH isteklerinde genellikle form verisi veya JSON verisi içerir. Burada name, email, country, contact gibi bilgileri alıyoruz.
  if (!user) {
    res.status(400).send("User Not Found");
  }
  user.name = name;
  user.email = email;
  user.country = country;
  user.contact = contact;
  res.send("updated user!");
};
