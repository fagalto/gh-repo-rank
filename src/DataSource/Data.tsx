import { createAppAuth } from "@octokit/auth-app";
import { fetchPaginate } from "fetch-paginate";
import Bottleneck from "bottleneck";


/*althoug request limit is 5000 per hour, it was tested that normal use of app  youc an set much more, because not all queries count as 1 request.
loading all details of reactjs community takes litlle more then 100 requests
*/
const MAX_REQUESTS_PER_HOUR = 40000;

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 3600000 / MAX_REQUESTS_PER_HOUR,
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
  referrerPolicy: "strict-origin-when-cross-origin",
  method: "GET",
  mode: "no-cors",
};

export const getCommunity = (community: string = "reactjs") => {
  return getData(communityEndpoint(community), connectOptions);
};
export const getMember = (url: string) => {
  return getDataSimple(url, connectOptions);
};



export async function getData(url: string, options: object) {
  const authorization = await auth({ type: "oauth-app" });
  const options2 = {
    fetchOptions: authorization,
    ...options,
  };
  const urlPageEnhanced = url + "?per_page=100";
  // data from api is often expected to be paginated. paginated request are scheduled to not overuse request limits
  const response = limiter.schedule(() => fetchPaginate(urlPageEnhanced, options2));
  return await response;
}

//some resources are not expoected to require pagination, such as single member or repo
export async function getDataSimple(url: string, options: object) {
  const authorization = await auth({ type: "oauth-app" });

  return await limiter.schedule(() => fetch(url, authorization));
}
