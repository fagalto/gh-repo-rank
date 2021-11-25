import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import * as types from "../../Store/types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Repository from "../Repository/Repository";

import { getItemFromlocalStorage, getData } from "../../DataSource/Data";

//const data = { rows: exampleData };
interface Member extends ReduxType {
  member: types.userDetailInfo;
}

const MemberDetails = (props: Member) => {
  const member = props.member;
  const [dt, setData] = useState({ repos: {}, member: "" });
  useEffect(() => {
    const fetchData = () => {
      console.log("fetching repos for",member.login)
      const storedRepos = getItemFromlocalStorage(member.login);
      storedRepos.length == 0
        ? props.fetchRepositories(member)
        : props.fetchReposFromLocal(JSON.parse(storedRepos) as types.repoEvent[]);
    }

    fetchData();
  },[]);

  const parseNum = (doubtIfItsNumber: any) => {
    return typeof doubtIfItsNumber == "number" ? doubtIfItsNumber : 0;
  };
  const reposAndGists =
    member !== undefined ? parseNum(member.public_repos) + parseNum(member.public_gists) : 0;

  const listRepositories = (filteredRepos: types.repoEvent[]) => {
    return filteredRepos.map((repo: types.repoEvent) => {
      return <Repository {...repo.repo} />
    });
  };
  const filterRepositories = (repositories: types.repoEvent[]) => {
    //console.log("filtering repos", repositories);
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
    localStorage.setItem(member.login, JSON.stringify(unique));

    return unique;
  };
  const repos =
    props.filter.memberRepos.length > 0
      ? listRepositories(filterRepositories(props.filter.memberRepos))
      : "Loading...";
  return (
    <Card>
      <CardMedia component="img" sx={{ height: 100, width: "auto" }} image={member.avatar_url} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {member.login}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            Tolal Contributions: {member.total_contributions} Repos&Gists:
            {reposAndGists} | followers:
            {member.followers}
          </Typography>
          <Typography component="div" variant="h5">
            Repositories: {repos}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
};

export default connectToStore(MemberDetails);
