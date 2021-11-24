import { Dispatch } from "redux";

import {
  exDataFetched,
  exDataFetchStart,
  exDataFetchError,
  membersDataFetchError,
  membersDataFetchStart,
  membersDataFetched,
  setMembersFromLocal,
} from "./actions";
import { filterActions, userObject, userDetailInfo } from "./types";

import { getCommunity, getMember, getData } from "../DataSource/Data";

export const fetchCommunityData = (dispatch: Dispatch<filterActions>) => {
  dispatch(exDataFetchStart());
  getCommunity()
    .then((res) => res.items as unknown as userDetailInfo[])
    .then((data) => dispatch(exDataFetched(data.slice(0, 10))))
    .catch((err) => dispatch(exDataFetchError(err)));
};
export const setMembersDetailsFromLocal = (dispatch: Dispatch<filterActions>, communityData: userDetailInfo[]) => {
  dispatch(setMembersFromLocal(communityData));
}

export const fetchAllMembersDetails = (dispatch: Dispatch<filterActions>, communityData: userDetailInfo[]) => {
  dispatch(membersDataFetchStart());
  const elems = communityData.map((elem: userDetailInfo) => {
    const eventsLink = elem.events_url.replace("{/privacy}", "");
    const noOfContributions = getData( eventsLink, {})
      .then((res) => res.items)
      .then((val) => val.length)

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
