import { useEffect, useState } from "react";
import "./addedit.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: " ",
  email: "",
  country: "",
  contact: "",
}; //başlangıç değerinmizin backendle eşleşmesi içn

const AddEdit = () => {
  const [data, setData] = useState(initialState);
  const { name, email, country, contact } = data;

  const { id } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);//getsingle id ile nasıl göndereciz useeffexct ile 
  //single user ile params ile çektiğimiz id ile data içerisine at data dolu gelince paramsla çektiğimiz id bilgilerini getirtiyor.

  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    if (res.status === 200) {
      setData({ ...res.data });//datayı güncelliz içerisined ne varsa onu al cdicez
    }
  };
  const createUser = async (data) => {
    const res = await axios.post("http://localhost:5000/users/", data);
    if (res.status === 200) {
      toast.success(res.data);
    }
  };

  const updateUser = async (data, id) => {
    const res = await axios.put(`http://localhost:5000/users/${id}`, data);
    if (res.status === 200) {
      toast.success(res.data); //res backendde ne mesaj varsa bize göndercek
    }
  }; //data ve idyi göndereceğiz sonrasında put işlemi cart curt

  const handleSubmit = (e) => {
    e.preventDefault(); //her kaydete bastığında sayfa yenilenmesini engellemek adına yaptık
    if (!name || !email || !country || !contact) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!id) {
      createUser(data); //eğer doluysa createUser'ı çalıştır ve bana güncel datayı gönder dedik
      //eğer id gelmezse creat gelirse
    } else {
      updateUser(data, id); //buradan he data hem idyi göndereceğiz
    }
    navigate("/");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value }); //datayı güncellicez nasıl datanın içindeki ne varsa al namei value değerinden al
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter a name"
            onChange={handleInputChange}
            value={name}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter a email"
            onChange={handleInputChange}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter a country"
            onChange={handleInputChange}
            value={country}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter a contact"
            onChange={handleInputChange}
            value={contact}
          />
        </div>
        <input type="submit" className="btn btn-success " values={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
