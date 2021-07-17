import React from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Box,
  Button,
  Typography,
} from "@material-ui/core";

import { useStyles } from "../styles/material_ui_styles";
import { withStyles } from "@material-ui/core/styles";
import { Spacer } from "../utils/helpers";
import { useHistory } from "react-router-dom";

const SeatResult = () => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const data = location.state.data;

  const handleButton = () => {
    history.push("/");
  };

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <Box className={classes.box}>
      <h2 className={classes.noResultTitle}>{data.name}</h2>
      <h2 className={classes.subTitle}>Seat: {data.seat}</h2>
      <Spacer height={22} />

      <TableContainer className={classes.tableCont}>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="center">
                <h3>SUBJECT</h3>
              </TableCell>
              <TableCell align="center">
                <h3>MARKS</h3>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.subjects.map((row) => (
              <StyledTableRow key={row.subject}>
                <TableCell align="center">
                  <Typography variant="body1">{row.subject}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">{row.marks}</Typography>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>

          <TableBody>
            <TableRow>
              <TableCell align="center">
                <h3>TOTAL</h3>
              </TableCell>
              <TableCell align="center">
                <h3>{data.totalMarks}</h3>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <h3>FINAL RESULT</h3>
              </TableCell>
              <TableCell align="center">
                <h3>
                  {data.finalResult} -{" "}
                  {((data.totalMarks / 600) * 100).toFixed(1)}%
                </h3>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Spacer height={22} />
      <Button variant="contained" color="primary" onClick={handleButton}>
        BACK
      </Button>
    </Box>
  );
};

export default SeatResult;
