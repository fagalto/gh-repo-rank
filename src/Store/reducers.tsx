import { act } from "react-dom/test-utils";
import {
  SearchTextActions as sa,
  FetchDataActions as fd,
  filterState,
  filterActions,
  userDetailInfo,
} from "./types";

const init: filterState = {
  data: [],
  memberData: [],
  isLoading: false,
    filteredData: {},
  error: null,
  phrase: "",
    searchPercent:"0"
};


export const filterReducer = (state: filterState = init, action: filterActions): filterState => {
   console.log(action.type);
  switch (action.type) {
    case fd.FETCH_EX_DATA_STARTED:
      return { ...state, isLoading: true, data: [], error: null };
    case fd.FETCH_EX_DATA_SUCCESS:
     
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        error: null,
      };
    case fd.FETCH_EX_DATA_ERROR:
      console.log("Error fetch",action.payload.error)
      return { ...state, isLoading: false, error: action.payload.error };
    
    case fd.FETCH_MEMBER_DATA_STARTED:
      
      return { ...state, isLoading: true };
    case fd.FETCH_MEMBER_DATA_SUCCESS:
      const newMembers = state.memberData.slice()
      newMembers.push(action.payload.data as unknown as userDetailInfo);
      return { ...state, isLoading: false, memberData: newMembers };
    case fd.FETCH_MEMBER_DATA_ERROR:
      return { ...state, error: action.payload.error };
  
    default:
      return state;
  }
};