import { FetchDataActions as fd, filterState, filterActions } from "./types";

const init: filterState = {
  data: [],
  memberData: [],
  isLoading: false,
  error: null,
  memberRepos: [],
  memberToView: "",
  repoDetails: [],
  communityName: "reactjs",
  sortedBy: { name: "", desc: false },
  reposAreLoading: false,
  repoIsLoading: false,
  loadingProgress: 0,
  bufferedProgress: 0,
  author: null
};

export const filterReducer = (state: filterState = init, action: filterActions): filterState => {
  switch (action.type) {
    case fd.FETCH_EX_DATA_STARTED:
      return { ...state, isLoading: true, data: [], error: null };
    case fd.FETCH_EX_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        bufferedProgress: 0,
        loadingProgress: 0,
        error: null,
        memberToView: "",
      };
    case fd.FETCH_EX_DATA_ERROR:
      console.log("Error fetch", action.payload.error);
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        bufferedProgress: 0,
        loadingProgress: 0,
      };

    case fd.FETCH_MEMBERS_DATA_STARTED:
      return { ...state, isLoading: true };
    case fd.FETCH_MEMBERS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingProgress: 0,
        bufferedProgress: 0,
        memberData: action.payload.data,
        data: action.payload.data,
      };
    case fd.FETCH_MEMBER_DATA_SUCCESS:
      const newMembers = state.memberData.slice();
      newMembers.push(action.payload.data);

      return {
        ...state,
        memberData: newMembers,
        data: newMembers,
      };
    case fd.FETCH_MEMBERS_DATA_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        loadingProgress: 0,
        bufferedProgress: 0,
      };
    case fd.SET_MEMBERS_FROM_LOCAL:
      return { ...state, data: action.payload.data, memberData: action.payload.data };
    case fd.SET_MEMBERS_TO_VIEW:
      return { ...state, memberToView: action.payload.data };
    case fd.REPOS_FETCH_START:
      return { ...state, reposAreLoading: true };
    case fd.REPOS_FETCHED:
      return {
        ...state,
        memberRepos: { ...state.memberRepos, [action.payload.member.login]: action.payload.data },
        reposAreLoading: false,
      };
    case fd.REPO_FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case fd.REPO_FETCH_START:
      return { ...state, repoIsLoading: true };
    case fd.REPO_FETCHED:
      return {
        ...state,
        repoDetails: action.payload.data,
        repoIsLoading: false,
      };
    case fd.REPOS_FETCH_ERROR:
      return {
        ...state,
        repoIsLoading: false,
        error: action.payload.error,
      };
    case fd.SET_REPOS_FROM_LOCAL:
      return { ...state, memberRepos: action.payload.data, reposAreLoading: false };
    case fd.SET_SORTED_COMMUNITY:
      return { ...state, memberData: action.payload.data, sortedBy: action.payload.sortedBy };
    case fd.SET_LOADING_PERCENT:
      return { ...state, loadingProgress: action.payload.data };
    case fd.SET_LOADING_BUFFERED:
      return { ...state, bufferedProgress: action.payload.data };
    case fd.REFRESH_DATA_FROM_API:
      return { ...state, data: [], memberData: [] };
    case fd.FETCH_AUTHOR_SUCCESS: {
      return { ...state, author: action.payload.data };
    }
    case fd.FETCH_AUTHOR_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
