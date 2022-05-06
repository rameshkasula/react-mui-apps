import { Container, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../app/slices/product";

export default function Home() {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);
  console.log("llll", isLoading, products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Fragment>
      <Container maxWidth="xl">
        <Typography variant="h2">home</Typography>
      </Container>
    </Fragment>
  );
}
