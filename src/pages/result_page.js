import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Divider,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";

import EmptyImg from "../assets/empty.svg";
import { useStyles } from "../styles/material_ui_styles";
import { useHistory } from "react-router-dom";
import { Spacer } from "../utils/helpers";
var jsonQuery = require("json-query");

const ResultPage = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const parms = new URLSearchParams(location.search);

  const name = parms.get("name").trim().toUpperCase();
  var stream = parms.get("stream").toLowerCase();
  var centre = parms.get("centre").toLowerCase();

  //split the name if full name is entrered
  var splitName = name.split(" ");

  var firstName = splitName[0];
  var surname = " ";

  //assign the surname if given.
  if (splitName.length > 1) {
    surname = splitName[splitName.length - 1];
  }

  //assign * to variables. * = all in query
  if (centre === "all") centre = "*";
  if (stream === "all") stream = "*";

  const [finalResultList, setfinalResultList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    queryData();
    // disables annoying useEffect warning
    // eslint-disable-next-line
  }, []);

  async function queryData() {
    var result = await getData();

    //just giving people enough time to read the quote
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    setfinalResultList(result);
  }

  async function getData() {
    var json = await fetch("/results.json");
    var res = await json.json();

    var resultFromCentre = [];

    // if no stream is provided, all the stream is returned
    var resultFromStream = jsonQuery(`[*${stream}]`, { data: res }).value;
    // checking by centre
    if (centre !== "*") {
      resultFromCentre = jsonQuery(`[*centre=${centre}]`, {
        data: resultFromStream,
      }).value;
    } else {
      // if no centre is given, return all
      // group result by using ** in one object
      resultFromCentre = jsonQuery(`[**]`, {
        data: resultFromStream,
      }).value;
    }

    //search using name
    var resultFromNames = resultFromCentre.filter((s) => {
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
                <Card key={index} className={classes.cardResult}>
                  <Button
                    key={index}
                    className={classes.btn}
                    onClick={() => handleOnClick(index)}
                  >
                    <CardContent key={index} className={classes.cardContent}>
                      <p className={classes.cardTitle}>{item.name}</p>
                      <p className={classes.cardSubtitle}>Seat: {item.seat}</p>
                      <Divider className={classes.divider} />
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
            <img alt="no_results" className={classes.image} src={EmptyImg} />
            <p className={classes.noResultTitle}>No Results</p>
            <Typography>
              Check spelling or try with surname/first name.
            </Typography>
          </>
        )
      ) : (
        <>
          <CircularProgress />
          <Spacer height={12} />
          <p>Being Happy is the Greatest form of Success.</p>
          <em>-unknown</em>
        </>
      )}
    </Box>
  );
};

export default ResultPage;
