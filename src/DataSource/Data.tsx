import { createAppAuth } from "@octokit/auth-app";
import { fetchPaginate } from "fetch-paginate";
import Bottleneck from "bottleneck";
import { userDetailInfo } from "../Store/types";

const MAX_REQUESTS_PER_HOUR = 20000;


const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime:3600000 / MAX_REQUESTS_PER_HOUR,
});


export const auth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
});


export const communityEndpoint = (community: string = "reactjs") => {
  return `https://api.github.com/orgs/${community}/members`;
};
export const connectOptions = {
  headers: {
    accept: "*/*",
  },
  referrerPolicy: "strict-origin-when-cross-origin",
  method: "GET",
  mode: "cors",
};


export const getCommunity = (community:string = "reactjs") => {
  return getData(communityEndpoint(community), connectOptions);
}
export const getMember = (url: string) => {
  return getDataSimple(url, connectOptions);
};

export const getMembersFromlocalStorage = () => {
    const membersDetailsInLocal = localStorage.getItem("membersDetails");
    const membersDetails =
    membersDetailsInLocal !== null ? JSON.parse(membersDetailsInLocal) as userDetailInfo[] : [];
  //console.log("data call from local storage", membersDetails)
return membersDetails
}
export const getItemFromlocalStorage = (itemName:string) => {
  const item = localStorage.getItem(itemName);
  const ret = item !== null ? (item) : ""
 // console.log("getting items from localStorage instead of", itemName)
  return ret
};

export async function getData(url: string, options: object) {
  const authorization = await auth({ type: "oauth-app" });
  const options2 = {
    fetchOptions: authorization,
  };
  const response = limiter.schedule(() => fetchPaginate(url, options2));
  return await response
}


export async function getDataSimple(url: string, options: object) {
  const authorization = await auth({ type: "oauth-app" });
  const options2 = {
    fetchOptions: authorization,
  };

  return await limiter.schedule(() => fetch(url, authorization));
}
