import React from "react";
import { useNavigate } from "react-router-dom";
import {Typography} from "@mui/material";
import "../styles/Navbar.css";

import { Box } from "@mui/material";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box style={{backgroundColor: "#76C2DC"}}>
    <nav  style={{backgroundColor: "black", borderRadius: "0px 0px 12px 12px"}} className="navbar navbar-expand-lg bg-body-tertiary top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            alt="app logo"
            style={{color: "white"}}
            length="35em"
            width="35em"
            src={require("./images/2-removebg-preview.png")}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                style={{color: "white", fontWeight: "500"}} className="nav-link active"
                aria-current="page"
                href="/customDashboard"

              >
                Custom DashBoard
              </a>
            </li>
            <li className="nav-item">
              <a style={{color: "white", fontWeight: "500"}} className="nav-link active" href="/analytics">
                Analytics
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {/* Use ml-auto to push the items to the right */}
            <li className="nav-item">
              <button className="nav-link logout-button" style={{backgroundColor: "white", padding: "4px 10px", borderRadius: "5px", color: "black"}} onClick={handleLogout} >
              <Typography
                variant="body1"
                style={{fontWeight: "bold"}}
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                LOG OUT
              </Typography>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </Box>
  );
};

export default Navbar;
