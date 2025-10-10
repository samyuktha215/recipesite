import React, { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "dgzwTiXahFJjvtapPW9ASvSymz8qdMIT",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  // This is where your backend call goes
  const handleCredentialResponse = (response) => {
    console.log("Google token:", response.credential);

    // Send token to your backend
    fetch("http://localhost:3001/protected", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${response.credential}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Backend response:", data))
      .catch((err) => console.error("Error:", err));
  };

  return <div id="googleSignInDiv"></div>;
}
