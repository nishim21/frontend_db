import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import TableComponent from "./TableComponent";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/bonds/security")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        // You can see the fetched data here
        // Now you can store the data in a local variabl
        // Do further processing with responseData
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [filter, setFilter] = useState("all"); // Initialize with default filter
  return (
    <Container fluid className="contain" style={{padding: "0px"}}>
      <Navbar />
      <Header />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar setFilter={setFilter} />
        </Col>
        <Col xs={12} md={10}>
          <SearchBar data={data} filter={filter} />
          {/* Your content for the right two-thirds of the dashboard */}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
