import { Container, Grid } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

export default function Posts() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={12} sm={12} md={12} key={index}>
            <PostCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
