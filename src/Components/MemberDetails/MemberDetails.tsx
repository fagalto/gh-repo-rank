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
import { isConstructorDeclaration } from "typescript";

//const data = { rows: exampleData };
interface Member extends ReduxType {
  member: types.userDetailInfo;
}

const MemberDetails = (props: Member) => {
  const member = props.member;
  const [dt, setData] = useState({ repos: {}, member: "" });
  useEffect(() => {
    const fetchData = () => {
      console.log("fetching repos for", member.login);
      const storedRepos = getItemFromlocalStorage(member.login);
      storedRepos.length == 0
        ? props.fetchRepositories(member)
        : props.fetchReposFromLocal(JSON.parse(storedRepos) as types.repoEvent[]);
      setData({ repos: props.filter.memberRepos, member: member.login });
    };

    fetchData();
  }, [member.login]);

  const parseNum = (doubtIfItsNumber: any) => {
    return typeof doubtIfItsNumber == "number" ? doubtIfItsNumber : 0;
  };
  const reposAndGists =
    member !== undefined ? parseNum(member.public_repos) + parseNum(member.public_gists) : 0;

  const listRepositories = (filteredRepos: types.repoEvent[]) => {
    return filteredRepos.map((repo: types.repoEvent) => {
      const repoProp = { repo: repo.repo };
      return <Repository {...repoProp} />;
    });
  };
  const filterRepositories = (repositories: types.repoEvent[]) => {
    const clearRepos = repositories.map((repo: types.repoEvent) => repo);
    const unique = clearRepos.filter(
      (val: types.repoEvent, index: number, array: types.repoEvent[]) => {
        return (
          array.findIndex((value: types.repoEvent) => {
            return (
              value.repo.id === val.repo.id &&
              value.repo.name === val.repo.name &&
              value.repo.url === val.repo.url
            );
          }) === index
        );
      }
    );

    return unique;
  };

  const repos =
    props.filter.memberRepos[member.login] !== undefined
      ? listRepositories(filterRepositories(props.filter.memberRepos[member.login]))
      : "Loading...";
  props.filter.memberRepos[member.login] !== undefined &&
    localStorage.setItem(
      member.login,
      JSON.stringify({ [member.login]: filterRepositories(props.filter.memberRepos[member.login]) })
    );
  return (
    <Card>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          sx={{ height: "auto", width: "100%" }}
          image={member.avatar_url}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="subtitle2" color="text.secondary">
              Member:
            </Typography>
            <Typography component="div" variant="h5">
              {member.login}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              <Stack direction="row" spacing={2}>
                <Chip
                  icon={<VolunteerActivismIcon color="warning" />}
                  label={member.total_contributions}
                />
                <Chip icon={<Group />} label={member.followers} />
                <Chip icon={<ForkRightIcon />} label={reposAndGists} />
              </Stack>
            </Typography>
            <Typography component="div" variant="h5">
              Repositories:
            </Typography>
            <Typography
              component="div"
              variant="h5"
              sx={{ maxHeight: "30vh", overflowY: "scroll" }}>
              {repos}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default connectToStore(MemberDetails);
