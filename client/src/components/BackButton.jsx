import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <button onClick={() => navigate(-1)} className="back-button">
      ← Tillbaka
    </button>
  );
}
