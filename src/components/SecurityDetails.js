import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";

const DataList = ({}) => {
  const {id}=useParams();
  // console.log(id);  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/bonds/security?id=${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="align-self-center">
      <h2 className="">Security Details</h2>
        <ListGroup>
          {data.map((item) => (
            <ListGroup.Item key={item.id}>
              <strong>Security Number</strong>: {item.id} <br/>
              <strong>isin : </strong>: {item.isin} <br/>
              <strong>cusip : </strong>: {item.cusip} <br/>
              <strong>Issuer : </strong>: {item.issuer} <br/>
              <strong>Maturity Date : </strong>: {item.maturitydate} <br/>
              <strong>Coupon : </strong>: {item.coupon} <br/>
              <strong>Type : </strong>: {item.type} <br/>
              <strong>Face Value : </strong>: {item.facevalue} <br/>
              <strong>Status : </strong>: {item.status} <br/>
            </ListGroup.Item>
          ))}
          
         <Button>Update</Button>
        </ListGroup>
      
    </Container>
  );
};

export default DataList;