import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import * as types from "../../Store/types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const EmptyMember = () => {
  return (
    <Card>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5" component="div">
            Member Details
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Select any member on list to view details
          </Typography>
        </CardContent>
    </Card>
  );
};

export default EmptyMember;
