import { Container, Grid } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

export default function Posts() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {Array.from(Array(12)).map((_, index) => (
          <Grid item xs={12} sm={12} md={6} key={index}>
            <PostCard />
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={6}>
          <PostCard />
        </Grid>
      </Grid>
    </Container>
  );
}
