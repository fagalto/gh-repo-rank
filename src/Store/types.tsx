import { ActionType } from "typesafe-actions";
import * as actions from "./actions";



export interface appData {
  rows: any[];
  filteredRows: any[];
}
export type barcodeDataArray = {
  item1: string;
  item2: string;
}
export interface userObject  {

  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  //
};

export interface userDetailInfo extends userObject {
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable?: string;
  bio?: string;
  twitter_username?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
  total_contributions?: string; 

}
export interface repoEvent {
repo:repo
}

interface repo {

id: number
name: string
url: string
}


export const  userDisplayedData =[
  "login",
  "avatar_url",
  "contributions",
  "followers",
  "repos_url"
]

export enum FetchDataActions {
  FETCH_EX_DATA_STARTED = "FETCH_EX_DATA_STARTED",
  FETCH_EX_DATA_SUCCESS = "FETCH_EX_DATA_SUCCESS",
  FETCH_EX_DATA_ERROR = "FETCH_EX_DATA_ERROR",
  FETCH_MEMBERS_DATA_STARTED = "FETCH_MEMBER_DATA_STARTED",
  FETCH_MEMBERS_DATA_SUCCESS = "FETCH_MEMBER_DATA_SUCCESS",
  FETCH_MEMBERS_DATA_ERROR = "FETCH_MEMBER_DATA_ERROR",
  SET_MEMBERS_FROM_LOCAL = "SET_MEMBERS_FROM_LOCAL",
}

export type filterActions = ActionType<typeof actions>;

export interface filterState {
  data: userDetailInfo[];
  filteredData: any;
  memberData: userDetailInfo[];
  isLoading: boolean;
  error: any;
  phrase: string;
  searchPercent: string;
}

export interface RootState {
  filter: filterState;
}