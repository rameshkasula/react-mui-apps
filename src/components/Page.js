import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "./common";

export default function Page({ title, action, children }) {
  const { isLoading } = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "70%",
          p: 2,
        }}
      >
        <CardHeader
          action={action ?? ""}
          title={title}
          // subheader="September 14, 2016"
        />
        <Divider />
        <CardContent>{isLoading ? <Loader /> : children}</CardContent>
      </Card>
    </Box>
  );
}
