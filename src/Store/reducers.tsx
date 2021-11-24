import { act } from "react-dom/test-utils";
import {
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
    
    case fd.FETCH_MEMBERS_DATA_STARTED:
      
      return { ...state, isLoading: true };
    case fd.FETCH_MEMBERS_DATA_SUCCESS:
      return { ...state, isLoading: false, memberData: action.payload.data, data:action.payload.data};
    case fd.FETCH_MEMBERS_DATA_ERROR:
      return { ...state, error: action.payload.error };
    case fd.SET_MEMBERS_FROM_LOCAL:
      return { ...state, data:action.payload.data, memberData:action.payload.data};
  
    default:
      return state;
  }
};