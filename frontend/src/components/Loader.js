import { Container } from "@mui/material";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useStyles } from "../styles";

const Loader = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" id="container">
      <div className={classes.loader}>
        <ThreeDots color="#00BFFF" height={40} width={80} />
      </div>
    </Container>
  );
};

export default Loader;
