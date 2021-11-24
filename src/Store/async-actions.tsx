import { Dispatch } from "redux";

import {
  exDataFetched,
  exDataFetchStart,
  exDataFetchError,
  memberDataFetchError,
  memberDataFetchStart,
  memberDataFetched,
  rowsFilterStart,
  rowsFiltered,
  searchPercent,
} from "./actions";
import { filterActions, userObject } from "./types";

import { getData, communityEndpoint, connectOptions, getMember } from "../DataExample/Data";

export const fetchCommunityData = (dispatch: Dispatch<filterActions>) => {
  dispatch(exDataFetchStart());
  getData(communityEndpoint, connectOptions)
    .then((res) => res.items)
    .then((data) => dispatch(exDataFetched(data)))
    .catch((err) => dispatch(exDataFetchError(err)));
};
export const fetchMemberData = (dispatch: Dispatch<filterActions>, memberId: string) => {
  dispatch(memberDataFetchStart(memberId));
  getData(memberId, connectOptions)
    .then((res) => res.items)
    .then((data) => dispatch(memberDataFetched(data, memberId)))
    .catch((err) => dispatch(memberDataFetchError(err)));
};

export const fetchAllUsers = (dispatch: Dispatch<filterActions>, communityData: userObject[]) => {
  const elems = communityData.map((elem: userObject, index: number) => {
    //console.log("fetching:", elem.login);
    return elem.url;
    //getMember(elem.url, connectOptions);
  });

  Promise.all(elems).then((values) => console.log(values));
};
