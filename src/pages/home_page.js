import React, { useState } from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  Typography,
  Link,
} from "@material-ui/core";

import { Spacer } from "../utils/helpers";
import { useStyles } from "../styles/material_ui_styles";

import { useHistory } from "react-router-dom";

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [centre, setCentre] = useState("");
  const [stream, setStream] = useState("");
  const [name, setName] = useState("");

  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [isCentreError, setIsCentreError] = useState(false);
  const [centreErrorText, setCentreErrorText] = useState("");
  const [isStreamError, setIsStreamError] = useState(false);
  const [streamErrorText, setStreamErrorText] = useState("");

  const twitter = "https://twitter.com/varadgauthankar";

  const handleTextField = (event) => {
    setName(event.target.value);
  };

  const handleCentre = (event) => {
    setCentre(event.target.value);
  };

  const handleStream = (event) => {
    setStream(event.target.value);
  };

  const validateName = () => {
    if (name === "") {
      setNameErrorText("Enter the name.");
      setIsNameError(true);
      return false;
    } else {
      setNameErrorText("");
      setIsNameError(false);
      return true;
    }
  };

  const validateCentre = () => {
    if (centre === "") {
      setCentreErrorText("Select Centre");
      setIsCentreError(true);
      return false;
    } else {
      setCentreErrorText("");
      setIsCentreError(false);
      return true;
    }
  };

  const validateStream = () => {
    if (stream === "") {
      setStreamErrorText("Select Stream");
      setIsStreamError(true);
      return false;
    } else {
      setStreamErrorText("");
      setIsStreamError(false);
      return true;
    }
  };

  const validateForm = () => {
    var isValid = false;
    if (validateName()) isValid = true;
    else isValid = false;
    if (validateStream()) isValid = true;
    else isValid = false;
    if (validateCentre()) isValid = true;
    else isValid = false;

    if (isValid) return true;
    else return false;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      history.push("/result", { name, centre, stream });
    }
  };

  return (
    <Box className={classes.box}>
      <p className={classes.homeTile}>Goa Board HSSC Result 2021</p>

      <Spacer height={12} />

      <FormControl className={classes.formControl}>
        <TextField
          label="Name"
          variant="outlined"
          helperText={nameErrorText}
          error={isNameError}
          onChange={handleTextField}
        />

        <Spacer height={12} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="stream">Stream</InputLabel>
          <Select
            labelId="stream"
            value={stream}
            onChange={handleStream}
            label="Stream"
            helperText={streamErrorText}
            error={isStreamError}
          >
            <MenuItem value="all">
              <em>All Streams</em>
            </MenuItem>
            <MenuItem value="science">Science</MenuItem>
            <MenuItem value="commerce">Commerce</MenuItem>
            <MenuItem value="arts">Arts</MenuItem>
            <MenuItem value="vocational">Vocational</MenuItem>
          </Select>
        </FormControl>

        <Spacer height={12} />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="centre">Centre</InputLabel>
          <Select
            labelId="centre"
            value={centre}
            onChange={handleCentre}
            label="Centre"
            helperText={centreErrorText}
            error={isCentreError}
          >
            <MenuItem value="all">
              <em>All Centres</em>
            </MenuItem>
            <MenuItem value="bicholim">Bicholim</MenuItem>
            <MenuItem value="canacona">Canacona</MenuItem>
            <MenuItem value="cuncolim">Cuncolim</MenuItem>
            <MenuItem value="curchorem">Curchorem</MenuItem>
            <MenuItem value="kepem">Kepem</MenuItem>
            <MenuItem value="marcela">Marcela</MenuItem>
            <MenuItem value="margao">Margao</MenuItem>
            <MenuItem value="mangueshi">Mangueshi</MenuItem>
            <MenuItem value="panaji">Panaji</MenuItem>
            <MenuItem value="harmal">Harmal</MenuItem>
            <MenuItem value="pilar">Pilar</MenuItem>
            <MenuItem value="ponda">Ponda</MenuItem>
            <MenuItem value="sanguem">Sanguem</MenuItem>
            <MenuItem value="sanquelim">Sanquelim</MenuItem>
            <MenuItem value="shiroda">Shiroda</MenuItem>
            <MenuItem value="tisk/dharbandoda">Dharbandoda</MenuItem>
            <MenuItem value="valpoi">Valpoi</MenuItem>
            <MenuItem value="vasco">Vasco</MenuItem>
            <MenuItem value="navelim">Navelim</MenuItem>
            <MenuItem value="porvorim">Porvorim</MenuItem>
            <MenuItem value="pernem">Pernem</MenuItem>
            <MenuItem value="mandrem">Mandrem</MenuItem>
            <MenuItem value="calangute">Calangute</MenuItem>
            <MenuItem value="verna">Verna</MenuItem>
            <MenuItem value="aldona">Aldona</MenuItem>
            <MenuItem value="cujira">Cujira</MenuItem>
            <MenuItem value="paingin">Paingin</MenuItem>
            <MenuItem value="mapusa - a">Mapusa - a</MenuItem>
            <MenuItem value="mapusa - b">Mapusa - b</MenuItem>
            <MenuItem value="netravali">Netravali</MenuItem>
          </Select>
        </FormControl>

        <Spacer height={12} />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </FormControl>
      <Spacer height={22} />

      <Link
        color="primary"
        rel="noopener"
        target="_blank"
        href={"https://ssc-result.netlify.app/?ref=hssc"}
      >
        SSC Result
      </Link>
      <Spacer height={12} />

      <Typography className={classes.root}>Developed by</Typography>
      <Typography className={classes.root}>
        <Link color="primary" rel="noopener" target="_blank" href={twitter}>
          Varad Gauthankar
        </Link>
      </Typography>
    </Box>
  );
};

export default HomePage;
