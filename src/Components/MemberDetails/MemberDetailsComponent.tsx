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
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
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
  reposAreLoading: boolean;
}

const MemberComponent = (props: Member) => {
  const member = props.member;
  console.log(member);
  const listRepositories = (filteredRepos: types.repoEvent[]) => {
    return filteredRepos.map((repo: types.repoEvent) => {
      const repoProp = { repo: repo.repo };
      return <Repository {...repoProp} />;
    });
  };
  const repositories = typeof props.repos != "string" ? listRepositories(props.repos) : props.repos;

  const name = props.member.name != null ? props.member.name : "hidden";

  const repos =
    typeof props.repos != "string" ? (
      listRepositories(props.repos)
    ) : (
      <Box>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  //sx={{ height: types.viewHeight * 0.95 }}

  return (
    <Card sx={{ maxHeight: "100%", overflowY: "scroll", height: types.viewHeight * 0.95 }}>
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <CardMedia
          component="img"
          sx={{ height: "auto", width: "50%" }}
          image={member.avatar_url}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography component="div" variant="subtitle2" color="text.secondary">
            Member:
          </Typography>
          <Typography component="div" variant="h6">
            {member.login}
          </Typography>
          <Typography component="div" variant="subtitle2" color="text.secondary">
            Name:
          </Typography>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Typography component="div" variant="subtitle2" color="text.secondary">
            Company:
          </Typography>
          <Typography component="div" variant="body2">
            {member.company}
          </Typography>
        </CardContent>
      </CardContent>
      <CardContent>
        <Typography component="div" variant="subtitle2" color="text.secondary">
          Bio:
        </Typography>
        <Typography component="div" variant="body2">
          {member.bio}
        </Typography>
      </CardContent>

      <CardContent sx={{ flex: "1 0 auto" }}>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Total number of contributions to all repositories" arrow>
            <Chip icon={<VolunteerActivismIcon />} label={member.total_contributions} />
          </Tooltip>
          <Tooltip title="Number of followers" arrow>
            <Chip icon={<Group />} label={member.followers} />
          </Tooltip>
          <Tooltip title="Numbers of repositories and gists published by member" arrow>
            <Chip icon={<ForkRightIcon />} label={props.reposAndGists} />
          </Tooltip>
        </Stack>
      </CardContent>
      <Divider />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          Repositories:
        </Typography>
        <Typography component="div" variant="h5">
          {repos}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MemberComponent;
