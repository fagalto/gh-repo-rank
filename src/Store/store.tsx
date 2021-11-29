import { combineReducers, createStore } from "redux";
import { filterReducer } from "./reducers";
import { RootState, userDetailInfo, repoEvent, sortedBy } from "./types";
import * as asyncactions from "./async-actions";
import { Dispatch } from "redux";
import { filterActions } from "./types";
import { connect } from "react-redux";

const store = createStore<RootState, any, any, any>(
  combineReducers({
    filter: filterReducer,
  })
);

export default store;

export const mapStateToProps = ({ filter }: RootState) => {
  return { filter };
};

export const mapDispatcherToProps = (dispatch: Dispatch<filterActions>) => {
  return {
    fetchCommunityData: (community: string) => asyncactions.fetchCommunityData(dispatch, community),
    fetchAllMembersDetails: (communityData: userDetailInfo[]) =>
      asyncactions.fetchAllMembersDetails(dispatch, communityData),
    getDatafromMemory: (communityData: userDetailInfo[]) =>
      asyncactions.setMembersDetailsFromLocal(dispatch, communityData),
    setMembertoDetailedView: (member: userDetailInfo) =>
      asyncactions.setMemberToViewDetails(dispatch, member),
    fetchRepositories: (member: userDetailInfo) => asyncactions.fetchRepos(dispatch, member),
    fetchReposFromLocal: (repos: repoEvent[]) => asyncactions.fetchReposFromLocal(dispatch, repos),
    setRepoToDetailedView: (repoUrl: string) => asyncactions.fetchRepoDetails(dispatch, repoUrl),
    setSortedArray: (sorted: userDetailInfo[], item: sortedBy) =>
      asyncactions.setSortedCommunity(dispatch, sorted, item),
    refreshData: () => asyncactions.refreshData(dispatch),
    getAuthor: (url:string)=>asyncactions.getAuthor(dispatch, url)
  };
};

export type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>;

export const connectToStore = (component: any, state: any = mapStateToProps) => {
  return connect(state, mapDispatcherToProps)(component);
};
