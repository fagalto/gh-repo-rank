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
  setSortedCommunityInState,
  setLoadingPercent,
  setLoadingBuffered,
  refreshDatafromApi,
} from "./actions";
import { filterActions, userDetailInfo, repoEvent, sortedBy } from "./types";

import { getCommunity, getMember, getData, getDataSimple } from "../DataSource/Data";

export const fetchCommunityData = (dispatch: Dispatch<filterActions>, community: string) => {
  dispatch(exDataFetchStart());
  getCommunity(community)
    .then((res) => res.items as unknown as userDetailInfo[])
    .then((data) => dispatch(exDataFetched(data)))
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
    .then((res) => res.json())
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

  const parseNum = (doubtIfItsNumber: any) => {
    return typeof doubtIfItsNumber == "number" ? doubtIfItsNumber : 0;
  };
  const len = communityData.length;

  const elems = communityData.map((elem: userDetailInfo, index: number) => {
    const percent = Math.ceil((100 * index) / len);
    dispatch(setLoadingBuffered(percent));
    const eventsLink = elem.events_url.replace("{/privacy}", "");
    const noOfContributions = getData(eventsLink, {})
      .then((res) => res.items)
      .then((val) => val.length);

    return noOfContributions.then((val) => {
      dispatch(setLoadingPercent(percent));
      return getMember(elem.url)
        .then((res) => res.json())
        .then((res) => {
          res as unknown as userDetailInfo;
          res.total_contributions = val;
          res.total_ReposAndGists = parseNum(res.public_repos) + parseNum(res.public_gists);

          // console.log("Fetching ", percent);

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
export const setSortedCommunity = (
  dispatch: Dispatch<filterActions>,
  sortedCommunity: userDetailInfo[],
  item: sortedBy
) => {
  dispatch(setSortedCommunityInState(sortedCommunity, item));
};
export const refreshData = (dispatch: Dispatch<filterActions>) => {
  localStorage.clear();
  dispatch(refreshDatafromApi());
  window.location.reload();
};
