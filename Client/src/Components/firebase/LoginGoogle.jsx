// GoogleLogin.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
}

export default GoogleLogin;
