import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "./Navbar";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import { FlexColumnAlignCenter } from "./Containers";
import { Typography } from "@mui/material";

export default function CustomDashboard({
  email,
  onCustomDash,
  setOnCustomDash,
}) {
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = React.useState("all");
  React.useEffect(() => {
    setOnCustomDash(true);
  });
  return (
    <Container fluid className="contain">
      <Navbar onCustomDash={onCustomDash} />
      <Header />
      <Row>
        <Col xs={12} md={2}>
          <Sidebar setFilter={setFilter} />
        </Col>

        {data.length > 0 ? (
          <Col xs={12} md={10}>
            <SearchBar data={data} filter={filter} />
            {/* Your content for the right two-thirds of the dashboard */}
          </Col>
        ) : (
          <Col xs={12} md={10}>
            <FlexColumnAlignCenter
              style={{
                rowGap: "3em",
                marginTop: "4em",
              }}
            >
              <img
                alt="no results found"
                length="400em"
                width="400em"
                src={require("./images/nofavorites.png")}
              />
              <Typography color="#2e5e80" variant="h5">
                No Favorites!
              </Typography>
            </FlexColumnAlignCenter>
          </Col>
        )}
      </Row>
    </Container>
  );
}
