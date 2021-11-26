import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import * as types from "../../Store/types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Repository from "../Repository/RepositoryChip";

import StarIcon from "@mui/icons-material/Star";
import Group from "@mui/icons-material/Group";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

import { getItemFromlocalStorage, getData } from "../../DataSource/Data";
import { isConstructorDeclaration, JsxElement } from "typescript";

//const data = { rows: exampleData };

export interface Member {
  member: types.userDetailInfo;
  repos: types.repoEvent[] | string;
  reposAndGists: number;
}

const MemberComponent = (props: Member) => {
  const member = props.member;

  const listRepositories = (filteredRepos: types.repoEvent[]) => {
    return filteredRepos.map((repo: types.repoEvent) => {
      const repoProp = { repo: repo.repo };
      return <Repository {...repoProp} />;
    });
  };
  const repositories = typeof props.repos != "string" ? listRepositories(props.repos) : props.repos;

  return (
    <Card sx={{ maxHeight: "100%", overflowY: "scroll" }}>
      <Box>
        <CardMedia
          component="img"
          sx={{ height: "33%", width: "auto%" }}
          image={member.avatar_url}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="subtitle2" color="text.secondary">
              Member:
            </Typography>
            <Typography component="div" variant="h5">
              {member.name} aka {member.login}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              <Stack direction="row" spacing={2}>
                <Chip
                  icon={<VolunteerActivismIcon color="warning" />}
                  label={member.total_contributions}
                />
                <Chip icon={<Group />} label={member.followers} />
                <Chip icon={<ForkRightIcon />} label={props.reposAndGists} />
              </Stack>
            </Typography>
            <Typography component="div" variant="h5">
              Repositories:
            </Typography>
            <Typography component="div" variant="h5">
              {repositories}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default MemberComponent;
