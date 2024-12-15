import { v4 as uuid } from "uuid";

let users = [
  {
    id: uuid(),
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
  res.send(users);
}; //kullanıcıları gönderdik

export const getSingleUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(400).send("User not found!");
  }
  res.send(user);
};


export const createUser = (req, res) => {
  const { name, email, country, contact } = req.body; //bodyden geliyo dedik
  const user = {
    id: uuid(),
    name: name,
    email: email,
    country:country,
    contact,
  };
  users.push(user); //oluşturudumuz userıı psuhla
  res.send("Yeni kullanıcı oluşturuldu");
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);
  users = users.filter((u) => u.id !== id);

  if (!user) {
    res.status(400).send("User Not Found");
  }
  res.send(users);
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);
  const { name, email, country, contact } = req.body; //bodyden geliyo dedik
  if (!user) {
    res.status(400).send("User Not Found");
  }
  user.name = name;
  user.email = email;
  user.country = country;
  user.contact = contact;
  res.send("updated user!");
};
