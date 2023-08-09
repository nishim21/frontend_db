import React, { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FlexRowSpaceBetween } from "./Containers";
import { Typography, Button, Drawer, Box, TextField } from "@mui/material";

const Header = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [id, setID] = useState("");
  const [isin, setIsin] = useState("");
  const [cusip, setCusip] = useState("");
  const [type, setType] = useState("");
  const [issuer, setIssuer] = useState("");
  const [maturitydate, setDate] = useState("");
  const [coupon, setCoupon] = useState("");
  const [facevalue, setFace] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("active");
  const [selectedDate, setSelectedDate] = useState(null);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setID("");
    setIsin("");
    setCusip("");
    setType("");
    setIssuer("");
    setDate("");
    setCoupon("");
    setFace("");
    setStatus("");
  };

  const handleSubmit = () => {
    const newItem = {
      id,
      isin,
      cusip,
      issuer,
      maturitydate,
      coupon,
      type,
      facevalue,
      status,
    };
    setItems([...items, newItem]);
    console.log(newItem);
    
    fetch("http://localhost:9090/bonds/security/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data sent to backend:", data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
      
    closeForm();
  };

  return (
    <FlexRowSpaceBetween
      className="grad"
      style={{ padding: "2rem", backgroundColor: "#76C2DC", marginBottom: "10px", borderRadius: "0px 0px 12px 12px" }}
    >
      <Typography
        variant="h4"
        noWrap
        component="div"
        sx={{ display: { xs: "none", sm: "block" } }}
        style={{color: "#ffffff", fontWeight: "bold"}}
      >
        BondMate
      </Typography>
      <Button size="small" variant="contained" style={{backgroundColor: "white", color: "#76C2DC"}} onClick={openForm}>
        <Typography
          variant="body1"
          style={{fontWeight: "bold"}}
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Create Bond
        </Typography>
      </Button>
      <Drawer
        open={isFormOpen}
        PaperProps={{
          style: {
            width: "600px",
            height: "100%",
            backgroundColor: "transparent",
          },
        }}
        anchor={"right"}
        onClose={closeForm}
        style={{
          display: "flex",
          borderRadius: "12px 12px 0px 0px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          style={{
            borderRadius: "12px 0px 0px 0px",
            background:
              "linear-gradient(92.81deg, #003361 -6.17%, #007CEC 106.57%)",
            color: "#FFF",
            padding: "20px 30px",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"} style={{ flexDirection: "column" }}>
            <Typography variant="h5" fontWeight={"bold"}>
              Add Bond Details
            </Typography>
            <Typography variant="subtitle">Create a new bond</Typography>
          </Box>
          <IconButton
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              marginTop: "10px",
            }}
            onClick={closeForm}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            height: "100%",
          }}
        >
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              width={"100%"}
              style={{ fontSize: "14px", width: "100%" }}
              required
              label="ID"
              onChange={(e) => setID(e.target.value)}
            />
          </Box>
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              style={{ fontSize: "14px", width: "100%" }}
              required
              label="Isin"
              onChange={(e) => setIsin(e.target.value)}
            />
          </Box>
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              style={{ fontSize: "14px", width: "100%" }}
              required
              label="Cusip"
              onChange={(e) => setCusip(e.target.value)}
            />
          </Box>
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              style={{ fontSize: "14px", width: "100%" }}
              required
              label="Issuer"
              onChange={(e) => setIssuer(e.target.value)}
            />
          </Box>
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              label="Date"
              type="date"
              value={maturitydate}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              type="number"
              step="any"
              style={{ fontSize: "14px", width: "100%" }}
              required
              label="Coupon rate"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </Box>
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              style={{ fontSize: "14px", width: "100%" }}
              required
              label="Type"
              onChange={(e) => setType(e.target.value)}
            />
          </Box>
          <Box style={{ padding: "10px 10px" }}>
            <TextField
              type="number"
              step="any"
              style={{ fontSize: "14px", width: "100%" }}
              required
              label="Face value"
              onChange={(e) => setFace(e.target.value)}
            />
          </Box>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Drawer>
    </FlexRowSpaceBetween>
  );
};

export default Header;
