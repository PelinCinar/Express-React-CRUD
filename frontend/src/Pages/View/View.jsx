import { Link, useParams } from "react-router-dom";
import "./view.css";
import { useEffect, useState } from "react";
import axios from "axios";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams(); //idmizi alıyoruz buradann

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    if (res.status === 200) {
      setUser({ ...res.data });//datayı güncelliz içerisined ne varsa onu al cdicez
    }
  };
  return (
    <div className="view">
      <div className="view-item">
        <b>ID:</b>
        <span>{user.id}</span>
      </div>
      <div className="view-item">
        <b>Name:</b>
        <span>{user.name}</span>
      </div>
      <div className="view-item">
        <b>Email:</b>
        <span>{user.email}</span>
      </div>
      <div className="view-item">
        <b>Country:</b>
        <span>{user.country}</span>
      </div>
      <div className="view-item">
        <b>Contact:</b>
        <span>{user.contact}</span>
      </div>
      <Link to={`/update/${user.id}`} className="btn btn-success">
        Edit
      </Link>
      <Link to={"/"} className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default View;
