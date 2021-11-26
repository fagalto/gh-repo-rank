import { useState, useEffect } from "react";
import { repo, GitRepo } from "../../Store/types";
import { connectToStore, ReduxType } from "../../Store/store";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";



const EmptyRepository = () => {

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Repository Details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Select any of member repositories to view it's Details
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmptyRepository;
