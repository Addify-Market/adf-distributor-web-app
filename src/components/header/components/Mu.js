import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginTop: "5rem",
  width: "28rem",
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function Mu() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {Array.from(Array(3)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Item>xs=2</Item>
        </Grid>
      ))}
    </Grid>
  );
}
