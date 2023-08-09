import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { Chip } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router";
import Button from '@mui/material/Button';

const Trades = () => {
  const [tradesData, setTradesData] = useState([]);
  const { id } = useParams();
  const navigate3 = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response =
        await axios.get(`http://localhost:9090/bonds/security/trade?id=${id}`);
      console.log(response);
      setTradesData(response.data);
    } catch (error) {
      console.error("Error fetching trades data:", error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    console.log("Item ID:", itemId);
  };

  const handleback = () => {
    navigate3("/dashboard");
  };

  return (
    <Box className="container card card-body temp" style={{ width: "100%", margin: "0px", maxWidth: "100%" }}>
      <Button
        variant="contained"
        style={{ position: 'absolute', top: 0, left: 0, margin: '10px' }}
        color="primary"
        onClick={handleback}
      >
        Back
      </Button>
      <center><h3>Trade Details</h3></center>
      <section>
        <div className="container card card-body temp">
          <Table responsive hover={true} className="table table-striped table-light">
            <thead>
              <tr className="table-primary">
                <th>select</th>
                <th>id</th>
                <th>Counter Party id</th>
                <th>Trade Date</th>
                <th>Settlement Date</th>
                <th>Buy_Sell</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {tradesData.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                  }}
                >
                  <td>
                    <Form.Check
                      type="checkbox"
                      className="custom-checkbox"
                      onChange={() => handleCheckboxChange(item.id)}
                      style={{ paddingLeft: "2em" }}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.counterpartyid}</td>
                  <td>{item.tradedate}</td>
                  <td>{item.settlementdate}</td>
                  <td>{item.buy_sell}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Chip
                      label={item.status}
                      color={item.status === "Completed" ? "success" : "error"}
                      variant="filled"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </Box>
  );
};

export default Trades;
