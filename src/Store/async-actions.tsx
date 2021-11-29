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
  memberDataFetchError,
  authorFetched,
  authorFetchError,
  authorFetchStarted,
} from "./actions";
import { filterActions, userDetailInfo, repoEvent, sortedBy, slimUser } from "./types";

import { getCommunity, getMember, getData, getDataSimple } from "../DataSource/Data";

import {
  putItemToLocalStorage,
  pushItemToLocalStorage,
  getItemFromlocalStorage,
  getMembersFromlocalStorage,
  clearLocalSorage,
} from "../DataSource/LocalMemoryManager";

export const fetchCommunityData = (dispatch: Dispatch<filterActions>, community: string) => {
  dispatch(exDataFetchStart());
  getCommunity(community)
    .then((res) => res.items as unknown as userDetailInfo[])
    .then((data) => {
      const reducedData = data.map((elem: slimUser) => {
        return {
          id: elem.id,
          login: elem.login,
          events_url: elem.events_url,
          url: elem.url,
          avatar_url: elem.avatar_url,
        };
      });
      putItemToLocalStorage("community_" + community, reducedData);
      return dispatch(exDataFetched(reducedData));
    })
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
  communityData: slimUser[],
  communityName: string
) => {
  dispatch(membersDataFetchStart());

  const parseNum = (doubtIfItsNumber: any) => {
    return typeof doubtIfItsNumber == "number" ? doubtIfItsNumber : 0;
  };
  const len = communityData.length;

  const elems = communityData.map((elem: slimUser, index: number) => {
    const percent = Math.ceil((100 * index) / len);
    //some url in dataset have {privacy} string. remove to get the data, but not sure if should respoect privacy in that case
    const eventsLink = elem.events_url.replace("{/privacy}", "");
    const cachedEvents = getItemFromlocalStorage(eventsLink); ///loook for stored computed copy.
    // since it takes a lot of time to compute events for user, they are cached in local storage
    const noOfContributions =
      parseNum(cachedEvents) > 0
        ? Promise.resolve(parseNum(cachedEvents)) // for code simplicity since local and fetched data are treated
        : getData(eventsLink, {})
            .then((res) => {
              return res.items;
            })
            .then((val) => {
              putItemToLocalStorage(eventsLink, val.length);
              return val.length;
            });
    return noOfContributions.then((val) => {
      dispatch(setLoadingBuffered(percent));
      return getMember(elem.url)
        .then((res) => res.json())
        .then((res: userDetailInfo) => {
          res.total_contributions = val;
          res.total_ReposAndGists = parseNum(res.public_repos) + parseNum(res.public_gists);
          //pushing to local storage item by item avoid refetching same data which takes long for community
          pushItemToLocalStorage("membersDetails_" + communityName, res);
          dispatch(setLoadingPercent(percent));

          // console.log("Fetching ", percent);

          return res;
        });
    });

    /////
  });

  Promise.all(elems)
    .then((data) => {
      ///if datasets lenght are different then load from local memory which probably contains some previously interrupted dataset
      const local = getMembersFromlocalStorage(communityName);
      data.length > local.length //i think it will never occur
        ? dispatch(membersDataFetched(data))
        : dispatch(membersDataFetched(local));
      ///save to localStorage to not overload Gtihub API
      putItemToLocalStorage("memberDataCompleted_" + communityName, true);
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
  clearLocalSorage();
  dispatch(refreshDatafromApi());
  window.location.reload();
};
export const getAuthor = (dispatch: Dispatch<filterActions>, url: string) => {
  dispatch(authorFetchStarted());
  return getMember(url)
    .then((res) => res.json())
    .then((res: userDetailInfo) => {
      dispatch(authorFetched(res));

      return res;
    })
    .catch((err) => dispatch(authorFetchError(err)));
};
