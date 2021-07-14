import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";

import { useStyles } from "../styles/material_ui_styles";
import { useHistory } from "react-router-dom";
var jp = require("jsonpath");
var jsonQuery = require("json-query");

const ResultPage = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const name = location.state.name.trim().toUpperCase();
  var centre = location.state.centre.toLowerCase();
  var stream = location.state.stream.toLowerCase();

  //split the name if full name is entrered
  var splitName = name.split(" ");

  var firstName = splitName[0];
  var surname = " ";

  //assign the surname if entered.
  if (splitName.length > 1) {
    surname = splitName[splitName.length - 1];
  }

  //assign * to variables. * = all in query
  if (centre === "all") centre = "*";
  if (stream === "all") stream = "*";

  // console.log(`centre: ${centre}`);
  // console.log(`stream: ${stream}`);
  // console.log(`fisrtName: ${firstName}`);
  // console.log(`surname: ${surname}`);

  const [finalResultList, setfinalResultList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    queryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // ^ disables annoying useEffect warning
  }, []);

  async function queryData() {
    var result = await getData();
    setIsLoaded(true);
    setfinalResultList(result);
  }

  async function getData() {
    var json = await fetch("/results.json");
    var res = await json.json();

    var resultFromCentre = [];

    var resultFromStream = jsonQuery(`[${stream}]`, { data: res }).value;

    if (centre !== "*") {
      resultFromCentre = jsonQuery(`[*centre=${centre}]`, {
        data: resultFromStream,
      }).value;
    } else {
      resultFromCentre = jsonQuery(`[**]`, {
        data: resultFromStream,
      }).value;
    }

    // console.log(resultFromCentre);

    var resultFromNames = resultFromCentre.filter((s) => {
      console.log(s);
      var split = s.name.split(" ");

      if (surname === " ") {
        return (
          split[0].includes(firstName) ||
          split[split.length - 1].includes(firstName)
        );
      } else {
        return (
          split[0].includes(firstName) &&
          split[split.length - 1].includes(surname)
        );
      }
    });

    return resultFromNames;
  }

  function handleOnClick(index) {
    history.push(`/result/${finalResultList[index].seat}`, {
      data: finalResultList[index],
    });
  }

  return (
    <Box className={classes.box}>
      {isLoaded ? (
        finalResultList.length > 0 ? (
          <>
            <h2>
              {finalResultList.length} results for {name}
            </h2>

            {finalResultList.map((item, index) => {
              return (
                <Card id={index} className={classes.cardResult}>
                  <Button
                    className={classes.btn}
                    onClick={() => handleOnClick(index)}
                  >
                    <CardContent className={classes.cardContent}>
                      <p className={classes.cardTitle}>{item.name}</p>
                      <p className={classes.cardSubtitle}>Seat: {item.seat}</p>
                      <Divider />

                      <p className={classes.cardOtherText}>
                        Centre: {item.centre}
                      </p>
                      <p className={classes.cardOtherText}>
                        Stream: {item.stream}
                      </p>
                    </CardContent>
                  </Button>
                </Card>
              );
            })}
          </>
        ) : (
          <>
            <Typography variant="h6">No Results :(</Typography>
            <Typography>
              check spelling or try with surname/first name.
            </Typography>
          </>
        )
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default ResultPage;
