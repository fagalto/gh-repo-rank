import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";
import { createTokenAuth } from "@octokit/auth-token";
import { fetchPaginate } from "fetch-paginate";
import { userDetailInfo } from "../Store/types";

enum ENV {
  CLIENT_ID = "1b66f00c8152fc1fcd4d",
  CLIENT_SECRET = "c6960bb003987c289dd1708d8caace28f596f582",
  TOKEN = "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"
}
export const auth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  clientId: ENV.CLIENT_ID,
  clientSecret: ENV.CLIENT_SECRET,
});

export const authToken = createTokenAuth(ENV.TOKEN);

export const communityEndpoint = "https://api.github.com/orgs/reactjs/members";
export const connectOptions = {
  headers: {
    Authorization: "token "+ENV.TOKEN,
    
    accept: "*/*",
    "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
  },
  referrerPolicy: "strict-origin-when-cross-origin",
  method: "GET",
  mode: "cors",
  my_client_id: ENV.CLIENT_ID,
  my_client_secret: ENV.CLIENT_SECRET,

  
};

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 1,
    privateKey: "-----BEGIN PRIVATE KEY-----\n...",
    clientId: ENV.CLIENT_ID,
    clientSecret: ENV.CLIENT_SECRET,
    installationId: 123,
  },
});

export async function getData(url: string, options: object) {
  const authorization = await auth({ type: "oauth-app" }).then((auth) => console.log(auth));
 
  return await fetchPaginate(url, options);
}
export async function getMember(url: string, options: object) {
  const auth = await authToken();
  return await fetch(url, options).then(res=>res as unknown as userDetailInfo);
}
export function getComunityMembers() {
  let rezult = getData(communityEndpoint, connectOptions);
  return rezult;
}
