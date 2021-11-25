import { Dispatch } from "redux";

import {
  exDataFetched,
  exDataFetchStart,
  exDataFetchError,
  membersDataFetchError,
  membersDataFetchStart,
  membersDataFetched,
  setMembersFromLocal,
  setMemberToView,
  reposFetched,
  reposFetchError,
  reposFetchStart,
  setReposFromLocalMemory,
  singleRepoFetched,
  singleRepoFetchError,
  singleRepoFetchStart,
} from "./actions";
import { filterActions, userObject, userDetailInfo, repoEvent } from "./types";

import { getCommunity, getMember, getData, getDataSimple } from "../DataSource/Data";

export const fetchCommunityData = (dispatch: Dispatch<filterActions>,community:string) => {
  dispatch(exDataFetchStart());
  getCommunity(community)
    .then((res) => res.items as unknown as userDetailInfo[])
    .then((data) => dispatch(exDataFetched(data.slice(0, 10))))
    .catch((err) => dispatch(exDataFetchError(err)));
};
export const fetchRepos = (dispatch: Dispatch<filterActions>, member: userDetailInfo) => {
  dispatch(reposFetchStart());

  const eventsLink = member.events_url.replace("{/privacy}", "");
  getData(eventsLink, {})
    .then((res) => res.items as repoEvent[])
    .then((data) => dispatch(reposFetched(data, member)))
    .catch((err) => dispatch(reposFetchError(err)));
};
export const setMembersDetailsFromLocal = (
  dispatch: Dispatch<filterActions>,
  communityData: userDetailInfo[]
) => {
  dispatch(setMembersFromLocal(communityData));
};

export const fetchRepoDetails = (dispatch: Dispatch<filterActions>, repoUrl: string) => {
  dispatch(singleRepoFetchStart());
  getDataSimple(repoUrl, {})
    .then(res=>res.json())
    .then((data) => dispatch(singleRepoFetched(data)))
    .catch((err) => dispatch(singleRepoFetchError(err)));
};

export const fetchReposFromLocal = (dispatch: Dispatch<filterActions>, repos: repoEvent[]) => {
  console.log("repos from local");
  dispatch(reposFetchStart());
  dispatch(setReposFromLocalMemory(repos));
};

export const fetchAllMembersDetails = (
  dispatch: Dispatch<filterActions>,
  communityData: userDetailInfo[]
) => {
  dispatch(membersDataFetchStart());

  const elems = communityData.map((elem: userDetailInfo) => {
    const eventsLink = elem.events_url.replace("{/privacy}", "");
    const noOfContributions = getData(eventsLink, {})
      .then((res) => res.items)
      .then((val) => val.length);

    return noOfContributions.then((val) => {
      return getMember(elem.url)
        .then((res) => res.json())
        .then((res) => {
          res as unknown as userDetailInfo;
          res.total_contributions = val;
          return res;
        });
    });
  });

  Promise.all(elems)
    .then((data) => {
      dispatch(membersDataFetched(data));
      ///save to localStorage to not overload Gtihub API
      localStorage.setItem("membersDetails", JSON.stringify(data));
    })
    .catch((err) => dispatch(membersDataFetchError(err)));
};

export const setMemberToViewDetails = (
  dispatch: Dispatch<filterActions>,
  member: userDetailInfo
) => {
  dispatch(setMemberToView(member));
};
