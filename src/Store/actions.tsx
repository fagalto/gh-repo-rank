import { action } from "typesafe-actions";
import { FetchDataActions, userDetailInfo, repoEvent,sortedBy } from "./types";

export const exDataFetched = (data: userDetailInfo[]) => {
  return action(FetchDataActions.FETCH_EX_DATA_SUCCESS, { data: data });
};
export const exDataFetchStart = () => {
  return action(FetchDataActions.FETCH_EX_DATA_STARTED, {});
};
export const exDataFetchError = (error: any) => {
  return action(FetchDataActions.FETCH_EX_DATA_ERROR, {
    error,
  });
};

export const membersDataFetched = (data: userDetailInfo[]) => {
  return action(FetchDataActions.FETCH_MEMBERS_DATA_SUCCESS, {
    data: data,
  });
};
export const membersDataFetchStart = () => {
  return action(FetchDataActions.FETCH_MEMBERS_DATA_STARTED, { });
};
export const membersDataFetchError = (error: any) => {
  return action(FetchDataActions.FETCH_MEMBERS_DATA_ERROR, {
    error,
  });
};
export const memberDataFetched = (data: userDetailInfo) => {
  return action(FetchDataActions.FETCH_MEMBER_DATA_SUCCESS, {
    data: data,
  });
};
export const memberDataFetchStart = () => {
  return action(FetchDataActions.FETCH_MEMBER_DATA_STARTED, {});
};
export const memberDataFetchError = (error: any) => {
  return action(FetchDataActions.FETCH_MEMBER_DATA_ERROR, {
    error,
  });
};
export const setMembersFromLocal = (data: userDetailInfo[]) => {
  return action(FetchDataActions.SET_MEMBERS_FROM_LOCAL, {
    data: data,
  });
};
export const setReposFromLocalMemory = (repos: repoEvent[]) => {
  return action(FetchDataActions.SET_REPOS_FROM_LOCAL, {
    data: repos,
  });
};
export const setMemberToView = (member: userDetailInfo) => {
    return action(FetchDataActions.SET_MEMBERS_TO_VIEW, {
      data: member,
    });
}
export const reposFetchStart = () => {
      return action(FetchDataActions.REPOS_FETCH_START, {
      });
  
}
export const reposFetched = (data: repoEvent[], member:userDetailInfo) => {
        return action(FetchDataActions.REPOS_FETCHED, {data:data, member:member});
};
export const reposFetchError = (error: any) => {
    return action(FetchDataActions.REPOS_FETCH_ERROR, { error: error });
};

export const singleRepoFetchStart = () => {
  return action(FetchDataActions.REPO_FETCH_START, {});
};
export const singleRepoFetched = (data: any) => {
  return action(FetchDataActions.REPO_FETCHED, { data: data });
};
export const singleRepoFetchError = (error: any) => {
  return action(FetchDataActions.REPO_FETCH_ERROR, { error: error });
};
;

export const setSortedCommunityInState = (community: userDetailInfo[],item:sortedBy) => {
  return action(FetchDataActions.SET_SORTED_COMMUNITY, { data: community,sortedBy:item });
};
export const setLoadingPercent = (percent: number) => {
  return action(FetchDataActions.SET_LOADING_PERCENT,{data:percent})
}
export const setLoadingBuffered = (percent: number) => {
  return action(FetchDataActions.SET_LOADING_BUFFERED, { data: percent });
};
;
export const refreshDatafromApi = () => {
  return action(FetchDataActions.REFRESH_DATA_FROM_API, {});
};
export const authorFetchStarted = () => {
  return action(FetchDataActions.FETCH_AUTHOR_STARTED, { });
};
export const authorFetched = (user: userDetailInfo) => {
  return action(FetchDataActions.FETCH_AUTHOR_SUCCESS, {data: user});
};
export const authorFetchError = (error: any) => {
  return action(FetchDataActions.FETCH_AUTHOR_ERROR, {
    error,
  });
};