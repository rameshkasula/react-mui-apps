import { Container } from "@mui/material";
import React, { Fragment } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPage = () => {
  const { reports } = useSelector((state) => state.user);
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: " of Tasks",
        data: reports,
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Fragment>
      <Container component={"main"} maxWidth={"xs"}>
        <Pie data={data} />
      </Container>
    </Fragment>
  );
};

export default ChartPage;
