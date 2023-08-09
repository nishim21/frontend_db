import { Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";

const Sidebar = ({ setFilter }) => {
  return (
    <nav
      id="sidebar"
      style={{
        width: "100%",
        height: "100vh",
        borderRight: "1px solid #e0e0e0",
        padding: 0,
        backgroundColor: "white"
      }}
    >
      <Box style={{backgroundColor: "darkgrey", borderRadius: "0px 5px 0px 0px", textAlign:"center"}}>
        <Typography color="white" variant="h6" justifyContent={"center"} >
          Filters
        </Typography>
      </Box>
      <Box style={{textAlign: "center"}}>
      <Typography color="#2e5e80" variant="body1">
        <ul className="list-unstyled components">
          <li className="active my-2 hover-color-change">
            <a
              href="#"
              className="text-decoration-none"
              style={{color: "#76C2DC", fontWeight:"bold", fontSize: "16px"}}
              onClick={() => setFilter("matured")}
            >
              Matured
            </a>
          </li>
          <li className="my-2">
            <a
              href="#"
              style={{color: "#76C2DC", fontWeight:"bold", fontSize: "16px"}}
              className="text-decoration-none"
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </a>
          </li>
          <li className="my-2">
            <a
              href="#"
              style={{color: "#76C2DC", fontWeight:"bold", fontSize: "16px"}}
              className=" text-decoration-none"
              onClick={() => setFilter("pending")}
            >
              Pending
            </a>
          </li>
          <li className="my-2">
            <a
              href="#"
              style={{color: "#76C2DC", fontWeight:"bold", fontSize: "16px"}}
              className="text-decoration-none"
              onClick={() => setFilter("flagged")}
            >
              Flagged
            </a>
          </li>
          <li className="my-2">
            <a
              href="#"
              style={{color: "#76C2DC", fontWeight:"bold", fontSize: "16px"}}
              className=" text-decoration-none"
              onClick={() => setFilter("all")}
            >
              All
            </a>
          </li>
        </ul>
      </Typography>
      </Box>
    </nav>
  );
};

export default Sidebar;
