import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./views/Detail/Detail";
import store from "./Redux/store/store";
import Home from "./views/home/home.component";
import CreateProduct from "./views/create/create.view";
import { getProducts } from "./Redux/actions/productsActions";
import Registro from "./Components/RegisterUser/registerUser.component";
import LoginForm from "./Components/Login/LoginForm.component";
import "./App.css";

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
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home products={products} />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Registro />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
