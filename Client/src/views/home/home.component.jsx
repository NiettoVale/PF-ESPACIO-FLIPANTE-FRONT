/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/actions/productsActions";
import Cards from "../../Components/cards/cards.component";
import Hero from "../../Components/Hero/Hero";
import NavBar from "../../Components/NavBar/navBar"; // Asegúrate de tener la ruta correcta
import FilterBar from "../../Components/FilterBar/FilterBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";

import styles from "./home.module.css";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productsFiltered = useSelector((state) => state.productsFiltered);
  const [busqueda, setBusqueda] = useState("");
  const [productsByName, setProductsByName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const filterSearch = useCallback(
    (searchTerm) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setProductsByName(filteredProducts);
    },
    [products]
  );

  useEffect(() => {
    if (busqueda === "" || busqueda === null) {
      dispatch(getProducts());
    } else {
      filterSearch(busqueda);
    }
  }, [busqueda, dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    busqueda === ""
      ? products.slice(indexOfFirstProduct, indexOfLastProduct)
      : productsByName.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    (busqueda === "" ? products.length : productsByName.length) /
      productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Hero />
      <ProductSlider />

      <h1>ESPACIO FLIPANTE</h1>
      <div className={styles.navBarWithSearch}>
        <NavBar />
        <div className={styles.spaceBetween}></div>{" "}
        {/* Espacio entre NavBar y SearchBar */}
        <SearchBar
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filterSearch={filterSearch}
        />
      </div>

      <FilterBar />

      <button className={styles.unButton} onClick={prev}>
        PREV
      </button>
      {pageNumbers.map((number) => (
        <button
          className={`${styles.unButton} ${
            number === currentPage ? styles.currentPageButton : ""
          }`}
          key={number}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
      <button className={styles.unButton} onClick={next}>
        NEXT
      </button>
      <div className="cards-container">
        {productsFiltered.length > 0 ? (
          <>
            <h2>Soy filtrado</h2>
            <Cards products={productsFiltered} />
          </>
        ) : null}

        {busqueda === "" ? (
          <>
            <h1>Catalogo</h1>
            <Cards products={currentProducts} />
          </>
        ) : (
          <>
            {currentProducts.length > 0 ? (
              <>
                <h1>Resultado de búsqueda</h1>
                <Cards products={currentProducts} />
              </>
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;

//  ! Este esta funcionando:
// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getProducts } from "../../Redux/actions/productsActions";
// import Cards from "../../Components/cards/cards.component";
// import Hero from "../../Components/Hero/Hero";
// import NavBar from "../../Components/NavBar/navBar"; // Asegúrate de tener la ruta correcta
// import FilterBar from "../../Components/FilterBar/FilterBar";
// import SearchBar from "../../Components/SearchBar/SearchBar";

// import styles from "./home.module.css";
// import Footer from "../../Components/Footer/Footer";

// const Home = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products);
//   const productsFiltered = useSelector((state) => state.productsFiltered);
//   const [busqueda, setBusqueda] = useState("");
//   const [productsByName, setProductsByName] = useState([]);

//   const filterSearch = useCallback(
//     (searchTerm) => {
//       const lowerCaseSearchTerm = searchTerm.toLowerCase();
//       const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().includes(lowerCaseSearchTerm)
//       );
//       setProductsByName(filteredProducts);
//     },
//     [products]
//   );

//   useEffect(() => {
//     if (busqueda === "" || busqueda === null) {
//       dispatch(getProducts());
//     } else {
//       filterSearch(busqueda);
//     }
//   }, [busqueda, dispatch]);

//   return (
//     <div>
//       <Hero />

//       <h1>ESPACIO FLIPANTE</h1>
//       <div className={styles.navBarWithSearch}>
//         <NavBar />
//         <div className={styles.spaceBetween}></div>{" "}
//         {/* Espacio entre NavBar y SearchBar */}
//         <SearchBar
//           busqueda={busqueda}
//           setBusqueda={setBusqueda}
//           filterSearch={filterSearch}
//         />
//       </div>

//       <FilterBar />
//       <div className="cards-container">
//         {productsFiltered.length > 0 ? (
//           <>
//             <h2>Soy filtrado</h2>
//             <Cards products={productsFiltered} />
//           </>
//         ) : null}

//         {busqueda === "" ? (
//           <>
//             <h1>Catalogo</h1>
//             <Cards products={products} />
//           </>
//         ) : (
//           <>
//             {productsByName.length > 0 ? (
//               <>
//                 <h1>Resultado de busqueda</h1>
//                 <Cards products={productsByName} />
//               </>
//             ) : (
//               <p>No se encontraron productos.</p>
//             )}
//           </>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;

// ! Codigo de Karen:

// const Home = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products);
//   const [busqueda, setBusqueda] = useState("");
//   const [productsByName, setProductsByName] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const filterSearch = useCallback(
//     (searchTerm) => {
//       const lowerCaseSearchTerm = searchTerm.toLowerCase();
//       const filteredProducts = products.filter((product) =>
//         product.name.toLowerCase().includes(lowerCaseSearchTerm)
//       );
//       setProductsByName(filteredProducts);
//     },
//     [products]
//   );

//   useEffect(() => {
//     if (busqueda === "" || busqueda === null) {
//       dispatch(getProducts());
//     } else {
//       filterSearch(busqueda);
//     }
//   }, [busqueda, dispatch]);

//   const productsPage = 10; // Establecer aquí la cantidad de juegos por página.

//   const indexOfLastGame = currentPage * productsPage;
//   const indexOfFirstGame = indexOfLastGame - productsPage;
//   const currentProducts = products.slice(indexOfFirstGame, indexOfLastGame);
//   console.log(currentProducts);

//   const totalPages = Math.ceil(products.length / productsPage);

//   const handlePageChange = (page) => {
//     console.log("Changing page to:", page);
//     setCurrentPage(page);
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }
//   const next = () => {
//     if (currentPage < pageNumbers.length) {
//       console.log("Next clicked, current page:", currentPage);
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   const prev = () => {
//     if (currentPage > 1) {
//       console.log("Prev clicked, current page:", currentPage);
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       <Hero />
// <button className={styles.unButton} onClick={prev}>
//   PREV
// </button>
// {pageNumbers.map((number) => (
//   <button
//     className={`${styles.unButton} ${
//       number === currentPage ? styles.currentPageButton : ""
//     }`}
//     key={number}
//     onClick={() => handlePageChange(number)}
//   >
//     {number}
//   </button>
// ))}
// <button className={styles.unButton} onClick={next}>
//   NEXT
// </button>

//       <h1>ESPACIO FLIPANTE</h1>
//       <div className={styles.navBarWithSearch}>
//         <NavBar />
//         <div className={styles.spaceBetween}></div>{" "}
//         {/* Espacio entre NavBar y SearchBar */}
//         <SearchBar
//           busqueda={busqueda}
//           setBusqueda={setBusqueda}
//           filterSearch={filterSearch}
//         />
//       </div>
//       <div className={styles.cardsContainer}>
//         <Cards products={currentProducts} />
//       </div>
//       <div className={styles.paginado}>
//         <button className={styles.unButtonAbajo} onClick={prev}>
//           PREV
//         </button>
//         {pageNumbers.map((number) => (
//           <button
//             className={styles.unButtonAbajo}
//             key={number}
//             onClick={() => handlePageChange(number)}
//           >
//             {number}
//           </button>
//         ))}
//         <button className={styles.unButtonAbajo} onClick={next}>
//           NEXT
//         </button>

//         <FilterBar />
//         <div className="cards-container">
//           {busqueda === "" || productsByName.length > 0 ? (
//             <Cards products={busqueda === "" ? products : productsByName} />
//           ) : (
//             <p>No se encontraron productos.</p>
//           )}
//         </div>
//         <div className={styles.catalogueSection}>
//           <h2>Catalogo</h2>
//           <p className={styles.catalogueSectionP}>ropa flipante</p>
//           <div className={styles.cardsContainer}>
//             <Cards products={products} />
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Home
