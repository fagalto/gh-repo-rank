import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import * as types from "../../Store/types";

import Repository from "../Repository/RepositoryChip";
import { getItemFromlocalStorage, getData } from "../../DataSource/Data";
import MemberComponent from "./MemberDetailsComponent";

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
      ? filterRepositories(props.filter.memberRepos[member.login])
      : "Loading...";
  props.filter.memberRepos[member.login] !== undefined &&
    localStorage.setItem(
      member.login,
      JSON.stringify({ [member.login]: filterRepositories(props.filter.memberRepos[member.login]) })
    );
  
  const memberprops = {
        member: member,
    repos: repos,
    reposAndGists:reposAndGists
  }
  return <MemberComponent {...memberprops} />;
};

export default connectToStore(MemberDetails);
