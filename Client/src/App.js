import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "./views/Detail/Detail";
import store from "./Redux/store/store";
import Home from "./views/home/home.component";
import CreateProduct from "./views/create/create.view";
import LoginForm from "./Components/Login/LoginForm.component"
import { getProducts } from "./Redux/actions/productsActions";
import "./App.css";
import Registro from "./Components/RegisterUser/registerUser.component";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await store.dispatch(getProducts());
        setProducts(productsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    
        <Routes>
          <Route path="/home" element={<Home products={products} />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<CreateProduct/>}/>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/register" element={<Registro/>}/>
          {/* Otros rutas aquí */}
        </Routes>
  );
}

export default App;
