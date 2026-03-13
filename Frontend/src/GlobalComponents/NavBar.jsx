import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav>
      <button type="button" className="nav-button" onClick={() => navigate("/Calendar")}>Calendar</button>
      <button type="button" className="nav-button" onClick={() => navigate("/Projects")}>Projects</button>
      <button type="button" className="nav-button" onClick={() => navigate("/Scan")}>Scan</button>
      <button type="button" className="nav-button" onClick={() => navigate("/Rooms")}>Rooms</button>
      <button type="button" className="nav-button" onClick={() => navigate("/Profile")}>Profile</button>
    </nav>
  );
}

export default NavBar;