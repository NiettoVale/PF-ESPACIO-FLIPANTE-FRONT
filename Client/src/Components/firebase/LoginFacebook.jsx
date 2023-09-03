// FacebookLogin.js
import React from "react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function FacebookLogin() {
  const navigate = useNavigate();
  const handleFacebooklogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleFacebooklogin}>Login with Facebook</button>;
}

export default FacebookLogin;
