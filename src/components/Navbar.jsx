import { faChartLine, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../images/Mann Ko Bhawana.png"; // Import the image

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const counselor = JSON.parse(localStorage.getItem("counselor"));
  const navigator = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigator("/login");
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#3B82F6", // Ensure this matches your background
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand"
          to="/home"
          style={{ paddingLeft: "2rem", display: "flex", alignItems: "center" }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "80px", height: "80px", marginRight: "10px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link
              className={`nav-link text-white me-3 ${isActive("/home")}`}
              to="/home"
            >
              Home
            </Link>
            {(user || counselor) && (
              <>
                {user && !user.isAdmin && (
                  <>
                    <Link
                      className={`nav-link text-white me-3 ${isActive(
                        "/user/issue"
                      )}`}
                      to="/user/issue"
                    >
                      Diagnose
                    </Link>
                    <Link
                      className={`nav-link text-white me-3 ${isActive(
                        "/user/counselor"
                      )}`}
                      to="/user/counselor"
                    >
                      Counselors
                    </Link>
                    <Link
                      className={`nav-link text-white me-3 ${isActive(
                        "/user/form"
                      )}`}
                      to="/user/form"
                    >
                      Booking
                    </Link>
                    <Link
                      className={`nav-link text-white me-3 ${isActive(
                        "/aboutus"
                      )}`}
                      to="/aboutus"
                    >
                      About
                    </Link>
                  </>
                )}
                {user && user.isAdmin && (
                  <Link
                    className={`nav-link text-white me-3 ${isActive(
                      "/admin/dashboard"
                    )}`}
                    to="/admin/dashboard"
                  >
                    <FontAwesomeIcon icon={faChartLine} /> Dashboard
                  </Link>
                )}
                {counselor && (
                  <>
                    <Link
                      className={`nav-link text-white me-3 ${isActive(
                        "/hippa"
                      )}`}
                      to="/hippa"
                    >
                      HIPPA
                    </Link>
                    <Link
                      className={`nav-link text-white me-3 ${isActive(
                        "/counselor/calendar"
                      )}`}
                      to="/counselor/calendar"
                    >
                      Appointments
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {user || counselor ? (
            <div className="d-flex align-items-center">
              <Link className=" buttonNav me-3" to="/profile">
                {(user && user.firstName) ||
                  (counselor && counselor.counselorName)}
              </Link>

              <FontAwesomeIcon
                icon={faSignOutAlt}
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  color: "white",
                  marginRight: "10px",
                }}
                title="Logout"
              />
            </div>
          ) : (
            <div className="dropdown ms-auto">
              <button
                className="buttonNav dropdown-toggle"
                type="button"
                id="loginDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </button>
              <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                <li>
                  <Link className="dropdown-item" to="/login?type=client">
                    Client
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login?type=provider">
                    Provider
                  </Link>
                </li>
              </ul>

              <Link className="button me-2" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
