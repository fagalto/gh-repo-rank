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



const RepositoryDetails = (props: ReduxType) => {
  const repo = props.filter.repoDetails as GitRepo;
const max = 999999
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Repository Details
        </Typography>
        <Typography variant="h5" component="div">
          {repo.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {repo.full_name}
        </Typography>
        <Typography variant="body2">
          {repo.description}, Language{repo.language}
        </Typography>
        <Typography variant="body2">
          <Stack direction="row" spacing={2}>
            <Chip icon={<StarIcon color="warning" />} label={repo.stargazers_count} />
            <Chip icon={<PersonIcon />} label={repo.watchers_count} />
            <Chip icon={<ForkRightIcon />} label={repo.forks} />
          </Stack>
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" href={repo.homepage}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default connectToStore(RepositoryDetails);
