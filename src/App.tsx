import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Components/Loading/Loading";
import List from "./Components/List/List";
import RepositoryDetails from "./Components/Repository/RepositoryDetails";

import MemberContainer from "./Components/MemberDetails/MemberContainer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as types from "./Store/types";
import { getMembersFromlocalStorage, getData } from "./DataSource/Data";

import { connectToStore, ReduxType } from "./Store/store";

const View: React.FC<ReduxType> = function (props) {
  const membersDetails = getMembersFromlocalStorage();
  const dataFromApiRequired = membersDetails.length > 0 ? false : true;

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
      props.fetchCommunityData(props.filter.communityName);
      setData({ ...dt, communityFetchStarted: true });
    };
    dataFromApiRequired == true && fetchData();
  }, []);
  useEffect(() => {
    const fetchUsers = () => {
      console.log("started", dt.userDetailsStarted);
      if (dt.userDetailsStarted == false && props.filter.data.length > 0) {
        props.fetchAllMembersDetails(props.filter.data);
        setData({ ...dt, userDetailsStarted: true });
      }
    };
    dataFromApiRequired == true && fetchUsers();
  });

  return Object.keys(props.filter.data).length > 0 ? (
    <Container>
      <Grid container sx={{ paddingTop: "20px" }} spacing={2}>
        <Grid item xs={12} sm={4} sx={{ maxHeight: "95vh" }}>
          <List />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ maxHeight: "95vh" }}>
          <MemberContainer />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ maxHeight: "95vh" }}>
          <RepositoryDetails />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Loader />
  );
};

export default connectToStore(View);
