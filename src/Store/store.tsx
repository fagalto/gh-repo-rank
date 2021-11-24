import { combineReducers, createStore } from "redux";
import { filterReducer } from "./reducers";
import { filterState, RootState, userDetailInfo } from "./types";
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
    fetchCommunityData: () => asyncactions.fetchCommunityData(dispatch),
    fetchAllMembersDetails: (communityData: userDetailInfo[]) =>
      asyncactions.fetchAllMembersDetails(dispatch, communityData),
    getDatafromMemory: (communityData:userDetailInfo[]) =>asyncactions.setMembersDetailsFromLocal(dispatch,communityData)
  };
};



export type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>;

export const connectToStore = (component: any, state: any = mapStateToProps) => {
  return connect(state, mapDispatcherToProps)(component);
};
