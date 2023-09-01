import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import styles from "./CreateForm.module.css";
import { getSizes } from "../../Redux/actions/productsActions";

const CreateForm = () => {
  const [imageInputs, setImageInputs] = useState([""]);
  const [isValidUrls, setIsValidUrls] = useState([true]); // Estado para controlar validez de URLs
  const {
    handleSubmit,
    control,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const sizes = useSelector((state) => state.sizes);
  const dispatch = useDispatch();
  const genderOptions = ["Seleccionar", "Nena", "Nene", "Mujer", "Hombre"];
  const categoryOptions = [
    "Seleccionar",
    "Accesorio",
    "Pantalon",
    "Calza",
    "Remera",
    "Buzo",
    "Conjunto",
    "Campera",
    "Jardinero",
  ];

  const onSubmit = async (data) => {
    if (data.gender === "Seleccionar") {
      setError("gender", { type: "manual" });
      return;
    }

    if (data.category === "Seleccionar") {
      setError("category", { type: "manual" });
      return;
    }

    // Validar que al menos un stock sea mayor a 0
    let atLeastOneStockValid = false;
    sizes.forEach((size) => {
      if (data[`stock_${size}`] && data[`stock_${size}`] > 0) {
        atLeastOneStockValid = true;
      }
    });

    if (!atLeastOneStockValid) {
      setError("stock_at_least_one", { type: "manual" });
      return;
    }

    const formattedData = {
      // Objeto para almacenar los datos del producto formateados
      name: data.name,
      gender: data.gender,
      category: data.category,
      mainMaterial: data.mainMaterial,
      images: [],
      price: data.price,
      description: data.description,
      sizes: [],
    };
    // Recorre la lista de talles y agrega talles con stock al objeto formattedData
    // sizes.forEach((size) => {
    //   if (data[`stock_${size}`]) {
    //     formattedData.sizes.push({
    //       size,
    //       stock: data[`stock_${size}`],
    //     });
    //   }
    // });

    // Enviar los datos al backend
    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        console.log("Producto creado exitosamente");
      } else {
        console.error("Hubo un error al crear el producto");
      }
    } catch (error) {
      console.error("Error en la comunicación con el servidor", error);
    }
  };

  const handleImageInputChange = (index, event) => {
    const newImageInputs = [...imageInputs];
    newImageInputs[index] = event.target.value;
    setImageInputs(newImageInputs);

    const newIsValidUrls = [...isValidUrls];
    newIsValidUrls[index] = isValidUrl(event.target.value);
    setIsValidUrls(newIsValidUrls);
  };

  const isValidUrl = (url) => {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  };

  const handleAddImageInput = () => {
    setImageInputs([...imageInputs, ""]);
    setIsValidUrls([...isValidUrls, true]);
  };

  const handleRemoveImageInput = (index) => {
    const newImageInputs = [...imageInputs];
    newImageInputs.splice(index, 1);
    setImageInputs(newImageInputs);

    const newIsValidUrls = [...isValidUrls];
    newIsValidUrls.splice(index, 1);
    setIsValidUrls(newIsValidUrls);
  };

  // const traerTalles = () => {
  //   dispatch(getSizes())
  // }
  useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  return (
    <form className={styles["create-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* <button onClick={traerTalles}>Traer Talles</button> */}
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          {...register("name", {
            required: true,
            maxLength: 30,
          })}
        />
        {errors.name?.type === "required" && (
          <span className={styles["error-message"]}>
            Este campo es obligatorio
          </span>
        )}
        {errors.name?.type === "maxLength" && (
          <span className={styles["error-message"]}>
            El nombre debe tener menos de 30 caracteres
          </span>
        )}
      </div>

      <div>
        <label htmlFor="gender">Género</label>
        <select {...register("gender", { required: true })}>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className={styles["error-message"]}>Completar este campo</span>
        )}{" "}
        {/* Mostrar mensaje de error */}
      </div>

      <div>
        <label htmlFor="category">Categoría</label>
        <select {...register("category", { required: true })}>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className={styles["error-message"]}>Completar este campo</span>
        )}{" "}
        {/* Mostrar mensaje de error */}
      </div>

      <div>
        <label htmlFor="mainMaterial">Material principal</label>
        <input type="text" {...register("mainMaterial", { required: true })} />
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea {...register("description", { required: true })} />
      </div>

      <div>
        <label htmlFor="images">Imágenes (Ingrese una URL por línea)</label>
        {imageInputs.map((image, index) => (
          <div key={index}>
            <input
              type="text"
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
        {errors.images?.type === "required" && (
          <span className={styles["error-message"]}>
            Debe ingresar URLs válidas
          </span>
        )}
        {errors.images?.type === "pattern" && (
          <span className={styles["error-message"]}>Ingrese URLs válidas</span>
        )}
      </div>

      <div>
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: true })}
        />
      </div>

      <div className={styles["size-stock-container"]}>
        <div className={styles["size-column"]}>
          <label className={styles["size-label"]}>Talles</label>
          {/* {sizes.map((size) => (
      <div key={size} className={styles["size-item"]}>
        {size}
      </div>
    ))} */}
        </div>
        <div className={styles["stock-column"]}>
          <label className={styles["stock-label"]}>Stock </label>
          {/* {sizes.map((size) => (
      <div key={size} className={styles["stock-item"]}>
        <Controller
          name={`stock_${size}`}
          control={control}
          defaultValue={0}
          render={({ field, fieldState }) => (
            <div className={styles["stock-input-container"]}>
              <input type="number" {...field} className={styles["stock-input"]} />
              {fieldState.value !== undefined && fieldState.value <= 0 && (
                <span className={styles['error-message']}>Debe ser mayor a 0</span>
              )}
            </div>
          )}
        />
      </div>
    ))} */}
          {errors.stock_at_least_one && (
            <span className={styles["error-message"]}>
              Al menos un stock debe ser mayor a 0
            </span>
          )}
        </div>
      </div>

      <button type="submit" className={styles["submit-button"]}>
        Crear Producto
      </button>
    </form>
  );
};

export default CreateForm;
