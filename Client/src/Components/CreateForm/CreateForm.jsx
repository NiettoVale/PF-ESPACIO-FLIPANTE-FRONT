import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateForm.module.css";
import {
  getCategory,
  getGenders,
  getSizes,
} from "../../Redux/actions/productsActions";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Seleccionar",
    category: "Seleccionar",
    sizes: {},
    mainMaterial: "",
    description: "",
    images: [""],
    price: 0,
    stock: 0,
  });

  const [isValidUrls, setIsValidUrls] = useState([true]);

  const dispatch = useDispatch();
  const sizesOptions = useSelector((state) => state.sizes);
  const genderOptions = useSelector((state) => state.genders);
  const categoryOptions = useSelector((state) => state.category);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSizeChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      sizes: {
        ...formData.sizes,
        [name]: Number(value),
      },
    });
  };

  const calculatestock = () => {
    const total = Object.values(formData.sizes).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setFormData({
      ...formData,
      stock: total,
    });
  };

  useEffect(() => {
    dispatch(getSizes());
    dispatch(getGenders());
    dispatch(getCategory());
  }, [dispatch]);

  const handleImageInputChange = (index, event) => {
    const newImages = [...formData.images];
    newImages[index] = event.target.value;
    setFormData({
      ...formData,
      images: newImages,
    });

    const newIsValidUrls = [...isValidUrls];
    newIsValidUrls[index] = isValidUrl(event.target.value);
    setIsValidUrls(newIsValidUrls);
  };

  const isValidUrl = (url) => {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  };

  const handleAddImageInput = () => {
    const newImages = [...formData.images, ""];
    setFormData({
      ...formData,
      images: newImages,
    });
    setIsValidUrls([...isValidUrls, true]);
  };

  const handleRemoveImageInput = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });

    const newIsValidUrls = [...isValidUrls];
    newIsValidUrls.splice(index, 1);
    setIsValidUrls(newIsValidUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Crear un objeto de opciones para la solicitud POST
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Convertir el objeto formData a JSON
      };

      console.log(JSON.stringify(formData));

      // Realizar la solicitud POST al servidor
      const response = await fetch(
        "http://localhost:3001/products",
        requestOptions
      );

      if (response.ok) {
        // Si la solicitud fue exitosa, puedes manejar la respuesta aquí
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        // Puedes hacer algo más con la respuesta aquí, como redireccionar o mostrar un mensaje de éxito.
      } else {
        // Si la solicitud no fue exitosa, puedes manejar el error aquí
        console.error(
          "Error en la solicitud al servidor:",
          response.status,
          response.statusText
        );
        // Puedes mostrar un mensaje de error o realizar otra acción apropiada.
      }
    } catch (error) {
      // Si ocurre un error en la solicitud, puedes manejarlo aquí
      console.error("Error en la solicitud al servidor:", error);
      // Puedes mostrar un mensaje de error o realizar otra acción apropiada.
    }
  };

  return (
    <form className={styles["create-form"]} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          maxLength="30"
        />
      </div>

      <div>
        <label htmlFor="gender">Género</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="Seleccionar">Seleccionar</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category">Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="Seleccionar">Seleccionar</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Talles y Stock</label>
        {sizesOptions.map((size) => (
          <div key={size}>
            <label htmlFor={`sizes_${size}`}>{size}</label>
            <input
              type="number"
              name={`sizes_${size}`}
              value={formData.sizes[`sizes_${size}`] || 0} // Cambia formData.sizes[size] a formData.sizes[`sizes_${size}`]
              onChange={handleSizeChange}
              onBlur={calculatestock}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="mainMaterial">Material principal</label>
        <input
          type="text"
          name="mainMaterial"
          value={formData.mainMaterial}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="images">Imágenes (Ingrese una URL por línea)</label>
        {formData.images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              name={`image_${index}`}
              value={image}
              onChange={(event) => handleImageInputChange(index, event)}
            />
            {isValidUrls[index] ? null : (
              <span className={styles["error-message"]}>URL inválida</span>
            )}
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveImageInput(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddImageInput}>
          Agregar Otra Imagen
        </button>
      </div>

      <div>
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className={styles["submit-button"]}>
        Crear Producto
      </button>
    </form>
  );
};

export default CreateForm;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import styles from "./CreateForm.module.css";
// import {
//   getCategory,
//   getGenders,
//   getSizes,
// } from "../../Redux/actions/productsActions";

// const CreateForm = () => {
//   const [imageInputs, setImageInputs] = useState([""]);
//   const [isValidUrls, setIsValidUrls] = useState([true]);
//   const {
//     handleSubmit,
//     control,
//     register,
//     setError,
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();
//   const sizesOptions = useSelector((state) => state.sizes);
//   const genderOptions = useSelector((state) => state.genders);
//   const categoryOptions = useSelector((state) => state.category);

//   const onSubmit = async (data) => {
//     console.log(data);
//     if (data.gender === "Seleccionar") {
//       setError("gender", { type: "manual" });
//       return;
//     }

//     if (data.category === "Seleccionar") {
//       setError("category", { type: "manual" });
//       return;
//     }

//     // Validar que al menos un stock sea mayor a 0
//     let atLeastOneStockValid = false;
//     sizesOptions.forEach((size) => {
//       if (data[`stock_${size}`] && data[`stock_${size}`] > 0) {
//         atLeastOneStockValid = true;
//       }
//     });

//     if (!atLeastOneStockValid) {
//       setError("stock_at_least_one", { type: "manual" });
//       return;
//     }

//     const formattedData = {
//       name: data.name,
//       gender: data.gender,
//       category: data.category,
//       mainMaterial: data.mainMaterial,
//       images: [],
//       price: data.price,
//       description: data.description,
//       sizes: [],
//     };

//     try {
//       const response = await fetch("http://localhost:3001/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formattedData),
//       });

//       console.log("Este es el JSON: ", formattedData);

//       if (response.ok) {
//         alert("Producto creado exitosamente");
//       } else {
//         alert("Hubo un error al crear el producto");
//       }
//     } catch (error) {
//       console.error("Error en la comunicación con el servidor", error);
//     }
//   };

//   const handleImageInputChange = (index, event) => {
//     const newImageInputs = [...imageInputs];
//     newImageInputs[index] = event.target.value;
//     setImageInputs(newImageInputs);

//     const newIsValidUrls = [...isValidUrls];
//     newIsValidUrls[index] = isValidUrl(event.target.value);
//     setIsValidUrls(newIsValidUrls);
//   };

//   const isValidUrl = (url) => {
//     const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
//     return pattern.test(url);
//   };

//   const handleAddImageInput = () => {
//     setImageInputs([...imageInputs, ""]);
//     setIsValidUrls([...isValidUrls, true]);
//   };

//   const handleRemoveImageInput = (index) => {
//     const newImageInputs = [...imageInputs];
//     newImageInputs.splice(index, 1);
//     setImageInputs(newImageInputs);

//     const newIsValidUrls = [...isValidUrls];
//     newIsValidUrls.splice(index, 1);
//     setIsValidUrls(newIsValidUrls);
//   };

//   useEffect(() => {
//     dispatch(getSizes());
//     dispatch(getGenders());
//     dispatch(getCategory());
//   }, [dispatch]);

//   return (
//     <form className={styles["create-form"]} onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         {/* <button onClick={traerTalles}>Traer Talles</button> */}
//         <label htmlFor="name">Nombre</label>
//         <input
//           type="text"
//           {...register("name", {
//             required: true,
//             maxLength: 30,
//           })}
//         />
//         {errors.name?.type === "required" && (
//           <span className={styles["error-message"]}>
//             Este campo es obligatorio
//           </span>
//         )}
//         {errors.name?.type === "maxLength" && (
//           <span className={styles["error-message"]}>
//             El nombre debe tener menos de 30 caracteres
//           </span>
//         )}
//       </div>

//       <div>
//         <label htmlFor="gender">Género</label>
//         <select {...register("gender", { required: true })}>
//           {genderOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//         {errors.gender && (
//           <span className={styles["error-message"]}>Completar este campo</span>
//         )}{" "}
//       </div>

//       <div>
//         <label htmlFor="category">Categoría</label>
//         <select {...register("category", { required: true })}>
//           {categoryOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//         {errors.category && (
//           <span className={styles["error-message"]}>Completar este campo</span>
//         )}
//       </div>

//       <div>
//         <label htmlFor="category">Talles</label>
//         <select {...register("sizes", { required: true })}>
//           {sizesOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//         {errors.category && (
//           <span className={styles["error-message"]}>Completar este campo</span>
//         )}
//       </div>

//       <div>
//         <label htmlFor="mainMaterial">Material principal</label>
//         <input type="text" {...register("mainMaterial", { required: true })} />
//       </div>

//       <div>
//         <label htmlFor="description">Descripción</label>
//         <textarea {...register("description", { required: true })} />
//       </div>

//       <div>
//         <label htmlFor="images">Imágenes (Ingrese una URL por línea)</label>
//         {imageInputs.map((image, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={image}
//               onChange={(event) => handleImageInputChange(index, event)}
//             />
//             {isValidUrls[index] ? null : (
//               <span className={styles["error-message"]}>URL inválida</span>
//             )}
//             {index > 0 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemoveImageInput(index)}
//               >
//                 Eliminar
//               </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={handleAddImageInput}>
//           Agregar Otra Imagen
//         </button>
//         {errors.images?.type === "required" && (
//           <span className={styles["error-message"]}>
//             Debe ingresar URLs válidas
//           </span>
//         )}
//         {errors.images?.type === "pattern" && (
//           <span className={styles["error-message"]}>Ingrese URLs válidas</span>
//         )}
//       </div>

//       <div>
//         <label htmlFor="price">Precio</label>
//         <input
//           type="number"
//           step="0.01"
//           {...register("price", { required: true })}
//         />
//       </div>

//       <button type="submit" className={styles["submit-button"]}>
//         Crear Producto
//       </button>
//     </form>
//   );
// };

// export default CreateForm;
