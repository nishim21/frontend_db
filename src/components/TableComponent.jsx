import React, { useState, useEffect } from "react";
import { Form, Table, Pagination } from "react-bootstrap";
import { Chip, IconButton } from "@mui/material";
import { FlexColumnAlignCenter } from "./Containers";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios'
import { useNavigate } from "react-router";

export const tableHeaders = [
  "Security ID",
  "ISIN",
  "CusIP",
  "Issuer",
  "Maturity Date",
  "Coupon",
  "Type",
  "Face Value",
  "Status",
  null,
  null
];

const TableComponent = ({
  data,
  selectedItems,
  setSelectedItems,
  filter,
  setCsvData,
  updateTableData
}) => {
  let checkedItems = selectedItems;

  const handleCheckboxChange = (index, e) => {
    if (e.target.checked) {
      checkedItems.push(data[index]);
    } else {
      checkedItems.splice(index, 1);
    }
    setSelectedItems(checkedItems);
    setCsvData([
      tableHeaders,
      ...selectedItems.map(
        ({
          id,
          isin,
          cusip,
          issuer,
          maturitydate,
          coupon,
          type,
          facevalue,
          status,
          
        }) => [
          id,
          isin,
          cusip,
          issuer,
          maturitydate,
          coupon,
          type,
          facevalue,
          status,
        ]
      ),
    ]);
  };
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let filteredData = data;
  const currentDate = new Date(); // Current date

  if (filter === "matured") {
    filteredData = data.filter(
      (item) => new Date(item.maturitydate) <= currentDate
    );
  } else if (filter === "pending") {
    filteredData = data.filter(
      (item) => new Date(item.maturitydate) > currentDate
    );
  } else if (filter === "flagged") {
    filteredData = filteredData.filter(
      (item) =>
        new Date(item.maturitydate) < currentDate && item.status === "Active"
    );
  } else if (filter === "upcoming") {
    const tenDaysLater = new Date();
    tenDaysLater.setDate(tenDaysLater.getDate() + 10);

    filteredData = filteredData.filter(
      (item) =>
        new Date(item.maturitydate) > currentDate &&
        new Date(item.maturitydate) <= tenDaysLater
    );
  }

  // Calculate the index of the last item of the current page
  const lastIndex = currentPage * itemsPerPage;

  // Calculate the index of the first item of the current page
  const firstIndex = lastIndex - itemsPerPage;

  // Get the items for the current page
  let currentItems = filteredData.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Change the current page number
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleChangeDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/bonds/security/delete?id=${id}`);
      const updatedData = data.filter(item => item.id !== id);
      // Call the function to update 'tableData' state in parent component
      updateTableData(updatedData);
    } catch (error) {
      console.error("An error occurred while deleting:", error);
      // Handle error here, display an error message, etc.
    }
  };  
  const navigate1 = useNavigate()
 const handlehover =(id)=>{
  navigate1(`/Trades/${id}`)
 }
  return (
    <Box>
      {data.length > 0 ? (
        <Box className="container card card-body temp" style={{width: "100%", margin: "0px", maxWidth: "100%"}}>
          <Table
            responsive
            hover={true}
            className="table table-striped table-light"
          >
            <thead>
              <tr className="table-primary">
                <th>Select</th>
                {tableHeaders.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                  }}
                >
                  <td>
                    <Form.Check
                      type="checkbox"
                      id={item.id}
                      className="custom-checkbox"
                      onChange={(e) => handleCheckboxChange(index, e)}
                      style={{ paddingLeft: "2em" }}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.isin}</td>
                  <td>{item.cusip}</td>
                  <td>{item.issuer}</td>
                  <td>{item.maturitydate}</td>
                  <td>{item.coupon}</td>
                  <td>{item.type}</td>
                  <td>{item.facevalue}</td>
                  <td>
                    <Chip
                      label={item.status}
                      color={item.status === "active" ? "success" : "error"}
                      variant="filled"
                    />
                  </td>
                  <td>
                  <IconButton onClick={() => handleChangeDelete(item.id)}>
            <DeleteOutlineIcon />
          </IconButton>
         
                  </td>
                  <td>
                  <IconButton  onClick={()=>handlehover(item.id)}>
           "View Details"
          </IconButton>
          </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ul class="pagination justify-content-center">
            <Pagination>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePagination(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </ul>
        </Box>
      ) : (
        <FlexColumnAlignCenter
          style={{
            rowGap: "3em",
          }}
        >
          <img
            alt="no results found"
            length="400em"
            width="400em"
            src={require("./images/nodatafound.png")}
          />
          <Typography color="#2e5e80" variant="h5">
            No Results Found!
          </Typography>
        </FlexColumnAlignCenter>
      )}
    </Box>
  );
};

export default TableComponent;
