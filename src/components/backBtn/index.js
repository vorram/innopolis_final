import { useNavigate } from "react-router-dom";
import "./backBtn.scss"

export default function BackBtn() {
  const navigate = useNavigate();

  return (
    <div className="backBtn" onClick={() => navigate(-1)}></div>
  )
}