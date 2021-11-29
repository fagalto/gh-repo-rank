import * as React from "react";
import { useState, useEffect } from "react";
import Loader from "./Components/Loading/Loading";
import List from "./Components/List/List";
import RepositoryDetails from "./Components/Repository/RepositoryDetails";
import MemberContainer from "./Components/MemberDetails/MemberContainer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import {
  getMembersFromlocalStorage,
  getItemFromlocalStorage,
} from "./DataSource/LocalMemoryManager";

import { connectToStore, ReduxType } from "./Store/store";
import { userDetailInfo, slimUser } from "./Store/types";

const View: React.FC<ReduxType> = function (props: ReduxType) {

  //check if loadin data from api is required.
  //cached responses length should be > 0 and equal in length to current community object
  const isCompleted =
    getItemFromlocalStorage("memberDataCompleted_" + props.filter.communityName) == true;

  const dataFromApiRequired = isCompleted !== true ? true : false;

  const [dt, setData] = useState({ communityFetchStarted: false, userDetailsStarted: false });

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const membersDetails = getMembersFromlocalStorage(props.filter.communityName);
      props.getDatafromMemory(membersDetails);
      setData({ userDetailsStarted: true, communityFetchStarted: true });
    };
    dataFromApiRequired === false && fetchDataFromLocalStorage();
  }, []);
  useEffect(() => {
    const fetchData = () => {
      console.log("fetching community data")
      props.fetchCommunityData(props.filter.communityName);
      setData({ ...dt, communityFetchStarted: true });
    };
    dataFromApiRequired === true && fetchData();
  }, []);
  useEffect(() => {
    const fetchUsers = () => {
      if (dt.userDetailsStarted === false && props.filter.data.length > 0) {
        //If stored memberData and communityData lenght are different,
        // it means that loading resources from api was interupted
        // so dispatch fetching data only for unmatched elements
        //compare functiomn -- onlu ids are compared
        const membersDetails = getMembersFromlocalStorage(props.filter.communityName);
        const diff = props.filter.data.filter(
          (elem: slimUser) =>
            !membersDetails.some((memberElem: userDetailInfo) => elem.id === memberElem.id)
        );

        diff.length > 0 && props.fetchAllMembersDetails(diff, props.filter.communityName);
        setData({ ...dt, userDetailsStarted: true });
      }
    };
    dataFromApiRequired === true && fetchUsers();
  });

  return Object.keys(props.filter.data).length > 0 ? (
    <Container maxWidth="xl">
      <Grid container sx={{ paddingTop: "20px" }} spacing={2}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={4}>
          <MemberContainer />
        </Grid>
        <Grid item xs={12} md={4}>
          <RepositoryDetails />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Loader />
  );
};

export default connectToStore(View);
