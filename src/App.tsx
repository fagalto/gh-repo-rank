import { useState, useEffect } from "react";
import "./App.css";
import List from "./Components/List/List";
import MemberDetails from "./Components/MemberDetails/MemberDetails"

import MemberContainer from "./Components/MemberDetails/MemberContainer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as types from "./Store/types";
import { getMembersFromlocalStorage, getData } from "./DataSource/Data";

import { connectToStore, ReduxType } from "./Store/store";

type Rows = {
  rows: object[];
  filteredRows: object[];
};

const FilteredTable: React.FC<ReduxType> = function (props) {
  const membersDetails = getMembersFromlocalStorage();
  const dataFromApiRequired = membersDetails.length > 0 ? false : true;

  //const usr = getData("https://api.github.com/users/3imed-jaberi/events" , {}).then(res => res.items).then(val=>val.length);

  const [dt, setData] = useState({ communityFetchStarted: false, userDetailsStarted: false });

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      props.getDatafromMemory(membersDetails);

      setData({ userDetailsStarted: true, communityFetchStarted: true });
    };

    dataFromApiRequired == false && fetchDataFromLocalStorage();
  }, []);
  useEffect(() => {
    const fetchData = () => {
      props.fetchCommunityData();

      setData({ ...dt, communityFetchStarted: true });
    };

    dataFromApiRequired == true && fetchData();
  }, []);
  useEffect(() => {
    const fetchUsers = () => {
      console.log("started", dt.userDetailsStarted);
      if (dt.userDetailsStarted == false && props.filter.data.length > 0) {
        props.fetchAllMembersDetails(props.filter.data.slice(0,10))
          setData({ ...dt, userDetailsStarted: true });
      }
    };

    dataFromApiRequired == true && fetchUsers();
  });

  return Object.keys(props.filter.data).length > 0 ? (
    <Grid container sx={{ paddingTop: "20px" }} spacing={2}>
      <Grid item xs={12} sm={4}>
        <List />
      </Grid>

      <Grid item xs={12} sm={4}>
        <MemberContainer  />
      </Grid>
      <Grid item xs={12} sm={4}>
        repo details
      </Grid>
    </Grid>
  ) : (
    <div>Loading...</div>
  );
};

export default connectToStore(FilteredTable);
