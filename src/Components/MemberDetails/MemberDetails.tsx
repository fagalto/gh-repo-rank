import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import * as types from "../../Store/types";
import { getItemFromlocalStorage } from "../../DataSource/Data";
import MemberComponent from "./MemberDetailsComponent";

//const data = { rows: exampleData };
interface Member extends ReduxType {
  member: types.userDetailInfo;
}

/*
Again, we try to fetch local data if they are already to save some time, fluency and to no overload api
*/

const MemberDetails = (props: Member) => {
  const member = props.member;
  const [dt, setData] = useState({ repos: {}, member: "" });
  useEffect(() => {
    const fetchData = () => {
      const storedRepos = getItemFromlocalStorage(member.login);
      storedRepos.length === 0
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

  //Loading only distinct repos of all repos events. Also savin it to local for future reuse
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
    reposAndGists: reposAndGists,
    reposAreLoading: props.filter.reposAreLoading,
  };
  return <MemberComponent {...memberprops} />;
};

export default connectToStore(MemberDetails);
