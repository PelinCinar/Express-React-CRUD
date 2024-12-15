import Header from "./components/Header";
import "./App.css";
import Home from "./Pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddEdit from "./Pages/AddEdit/AddEdit";
import {ToastContainer} from "react-toastify"
import View from "./Pages/View/View";
const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<AddEdit/>}/>
          <Route path="/update/:id" element={<AddEdit/>}/>
          <Route path="/view/:id" element={<View/>}/>



        </Routes>
       
      </div>
    </Router>
  );
};

export default App;
