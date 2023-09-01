import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './actionTypes';

export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/login', formData); // Ajusta la ruta del servidor según tu configuración
    if (response.status === 200) {
      dispatch({ type: LOGIN_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  // Realiza cualquier limpieza necesaria y luego dispara la acción de cierre de sesión
  dispatch({ type: LOGOUT });
};
