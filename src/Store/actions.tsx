import { action } from "typesafe-actions";
import { SearchTextActions, FetchDataActions, userObject } from "./types";

export const exDataFetched = (data: any) => {
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

export const memberDataFetched = (data:any, memberId:string) => {
  return action(FetchDataActions.FETCH_MEMBER_DATA_SUCCESS, { data: data, memberId:memberId });
};
export const memberDataFetchStart = (memberId:string) => {
  return action(FetchDataActions.FETCH_MEMBER_DATA_STARTED, {data: memberId});
};
export const memberDataFetchError = (error: any) => {
  return action(FetchDataActions.FETCH_MEMBER_DATA_ERROR, {
    error,
  });
};

export const rowsFilterStart = (text: string) => {
  return action(SearchTextActions.ROWS_FILTER_START, { phrase: text });
};
export const rowsFiltered = (data: any) => {
  return action(SearchTextActions.ROWS_FILTERED, { data: data });
};
export const searchPercent = (percent: string) => {
  return action(SearchTextActions.SET_PERCENT, { data: percent });
};
