import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

//only to store anv view member list.
export interface slimUser {
  login: string;
  id: number;
  events_url: string;
  url: string;
  avatar_url: string;
}

export interface userObject {
  login: string;
  id: number;
  node_id?: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  //
}

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
  total_contributions?: number;
  total_ReposAndGists?: number;
}
export interface repoEvent {
  repo: repo;
}

export interface repo {
  id: number;
  name: string;
  url: string;
}

export const userDisplayedData = ["login", "avatar_url", "contributions", "followers", "repos_url"];

export enum FetchDataActions {
  FETCH_EX_DATA_STARTED = "FETCH_EX_DATA_STARTED",
  FETCH_EX_DATA_SUCCESS = "FETCH_EX_DATA_SUCCESS",
  FETCH_EX_DATA_ERROR = "FETCH_EX_DATA_ERROR",
  FETCH_MEMBERS_DATA_STARTED = "FETCH_MEMBERS_DATA_STARTED",
  FETCH_MEMBERS_DATA_SUCCESS = "FETCH_MEMBERS_DATA_SUCCESS",
  FETCH_MEMBERS_DATA_ERROR = "FETCH_MEMBERS_DATA_ERROR",
  FETCH_MEMBER_DATA_STARTED = "FETCH_MEMBER_DATA_STARTED",
  FETCH_MEMBER_DATA_SUCCESS = "FETCH_MEMBER_DATA_SUCCESS",
  FETCH_MEMBER_DATA_ERROR = "FETCH_MEMBER_DATA_ERROR",
  SET_MEMBERS_FROM_LOCAL = "SET_MEMBERS_FROM_LOCAL",
  SET_MEMBERS_TO_VIEW = "SET_MEMBERS_TO_VIEW",
  REPOS_FETCH_START = "REPOS_FETCH_START",
  REPOS_FETCHED = "REPOS_FETCHED",
  REPOS_FETCH_ERROR = "REPOS_FETCH_ERROR",
  SET_REPOS_FROM_LOCAL = "SET_REPOS_FROM_LOCAL",

  REPO_FETCH_START = "REPO_FETCH_START",
  REPO_FETCHED = "REPO_FETCHED",
  REPO_FETCH_ERROR = "REPO_FETCH_ERROR",
  SET_SORTED_COMMUNITY = "SET_SORTED_COMMUNITY",
  SET_LOADING_PERCENT = "SET_LOADING_PERCENT",
  SET_LOADING_BUFFERED = "SET_LOADING_BUFFERED",
  REFRESH_DATA_FROM_API = "REFRESH_DATA_FROM_API",

  FETCH_AUTHOR_STARTED = "FETCH_AUTHOR_STARTED",
  FETCH_AUTHOR_SUCCESS = "FETCH_AUTHOR_SUCCESS",
  FETCH_AUTHOR_ERROR = "FETCH_AUTHOR_ERROR",
}

export type filterActions = ActionType<typeof actions>;

export interface filterState {
  communityName: string;
  data: slimUser[];
  memberData: userDetailInfo[];
  isLoading: boolean;
  loadingProgress: number;
  bufferedProgress: number;
  error: any;
  memberToView: userDetailInfo | string;
  memberRepos: any;
  repoDetails: any;
  sortedBy: sortedBy;
  reposAreLoading: boolean;
  repoIsLoading: boolean;
  author: userDetailInfo | null;
}
export interface sortedBy {
  name: string;
  desc: boolean;
}
export interface RootState {
  filter: filterState;
}

export interface GitRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: userDetailInfo;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;

  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks: number;
  open_issues: number;
  watchers: number;
}
export const viewHeight = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
