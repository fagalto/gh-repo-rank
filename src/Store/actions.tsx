import { action } from "typesafe-actions";
import { FetchDataActions, userObject, userDetailInfo } from "./types";

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
export const setMembersFromLocal = (data: userDetailInfo[]) => {
  return action(FetchDataActions.SET_MEMBERS_FROM_LOCAL, {
    data: data,
  });
};

