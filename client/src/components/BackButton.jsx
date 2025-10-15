import { useNavigate, useLocation } from "react-router-dom";

// Component that conditionally shows a back button
export default function BackButton() {
  const navigate = useNavigate(); // Hook used to navigate back in history
  const location = useLocation(); // Gives access to the current URL path

  // Do not display the button on the home page
  if (location.pathname === "/") return null;

  return (
    // Button that sends the user one step back in browser history
    <button onClick={() => navigate(-1)} className="back-button">
      ← Tillbaka
    </button>
  );
}
