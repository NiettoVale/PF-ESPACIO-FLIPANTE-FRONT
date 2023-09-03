import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUserAction }  from '../../Redux/actions/usersActions';
import { Link,useNavigate} from 'react-router-dom';

const LoginForm = () => {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Envía los datos del formulario al servidor
  //   dispatch(loginUserAction(formData));
  // };

  // Creamos una función que se ejecuta cuando enviamos el formulario.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realizamos una petición al backend usando fetch y le pasamos el método y lo que le queremos enviar.
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Obtenemos los datos de la respuesta de la petición y los almacenamos
      const responseData = await response.json();

      // Verificamos el estado de las posibles respuestas del servidor y mostramos adecuadamente los mensajes:
      if (response.status === 200) {
        alert(responseData.message);
        navigate('/home');
        
        
        // window.location.reload();
      }
    } catch (error) {
      // Si hubo algún error que no es del servidor, lo mostramos
      alert("Algo salió mal.");
      console.log(error.message);
    }
  };

  // console.log(formData)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre de Usuario</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='nombre de usuario o email'
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='password'
        />
      </div>
      <button type="submit" >Iniciar Sesión</button>
      <Link to="/register">
        <button>Registrarse</button>
      </Link>
    </form>
  );
};

export default LoginForm;
