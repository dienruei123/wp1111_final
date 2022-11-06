import React from "react";
import { useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { TableSortLabel, Typography } from "@material-ui/core";

function createData(name, subject, score) {
  return { name, subject, score };
}
const rows = [
  createData("Frozen yogh", "ffff", 6.0),
  createData("Ice creadsfadfam s", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0),
];
const headList = [
  {
    id: "name",
    label: "Name",
    numeric: false,
  },
  {
    id: "subject",
    label: "Subject",
    numeric: false,
  },
  {
    id: "score",
    label: "Score",
    numeric: true,
  },
];
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
const comparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
const sortRows = (array, comparator) => {
  const array_ = array.map((el, index) => [el, index]);
  array_.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return array_.map((el) => el[0]);
};

// export default function () {}
export default function () {
  const [value, setValue] = React.useState(0);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("score");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    // <Box sx={{ width: "100%" }}>
    //   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //     <Tabs value={value} onChange={handleChange}>
    //       <Tab label="Item One" sx={{ textTransform: "none" }} />
    //       <Tab label="Item Two" />
    //     </Tabs>
    //   </Box>
    //   {/* <div value={value} index={0} hidden={value !== 0}>
    //     Item One
    //   </div>
    //   <div value={value} index={1}>
    //     Item Two
    //   </div>
    //   <div value={value} index={2}>
    //     Item Three
    //   </div> */}
    // </Box>
    <Table style={{ minWidth: 650 }} size="small">
      <TableHead>
        <TableRow>
          {headList.map((headCell) => {
            return (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={handleSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
          {/* <TableCell align="center">Name</TableCell>
          <TableCell align="center">Subject</TableCell>
          <TableCell align="center">Score</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortRows(rows, comparator(order, orderBy)).map((row) => (
          <TableRow
            key={row.name}
            style={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.subject}</TableCell>
            <TableCell align="right">{row.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
