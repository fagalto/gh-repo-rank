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
  setReposFromLocalMemory
} from "./actions";
import { filterActions, userObject, userDetailInfo,repoEvent } from "./types";

import { getCommunity, getMember, getData, getItemFromlocalStorage } from "../DataSource/Data";

 export const fetchCommunityData = (dispatch: Dispatch<filterActions>) => {
  dispatch(exDataFetchStart());
  getCommunity()
    .then((res) => res.items as unknown as userDetailInfo[])
    .then((data) => dispatch(exDataFetched(data.slice(0, 10))))
    .catch((err) => dispatch(exDataFetchError(err)));
};
export const fetchRepos = (dispatch: Dispatch<filterActions>,member:userDetailInfo) => {
  dispatch(reposFetchStart());

  const eventsLink = member.events_url.replace("{/privacy}", "");
  getData(eventsLink, {})
    .then((res) => res.items as repoEvent[])
    .then((data) => dispatch(reposFetched(data)))
    .catch((err) => dispatch(reposFetchError(err)));
};
 export  const setMembersDetailsFromLocal = (
   dispatch: Dispatch<filterActions>,
   communityData: userDetailInfo[]
 ) => {
   dispatch(setMembersFromLocal(communityData));
};
 
 export const fetchReposFromLocal = (
   dispatch: Dispatch<filterActions>,
   repos: repoEvent[]
 ) => {
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

export const setMemberToViewDetails = (dispatch: Dispatch<filterActions>, member: userDetailInfo) => {
  dispatch(setMemberToView(member));
};
