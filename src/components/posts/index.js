import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

export default function Posts() {
  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="coloumn">
            {Array.from(Array(2)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <PostCard />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography>{"hello"}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
