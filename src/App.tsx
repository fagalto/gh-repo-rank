import { useState, useEffect } from "react";
import Loader from "./Components/Loading/Loading";
import List from "./Components/List/List";
import RepositoryDetails from "./Components/Repository/RepositoryDetails";
import MemberContainer from "./Components/MemberDetails/MemberContainer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { getMembersFromlocalStorage, getItemFromlocalStorage } from "./DataSource/Data";

import { connectToStore, ReduxType } from "./Store/store";
import { userDetailInfo } from "./Store/types";

const View: React.FC<ReduxType> = function (props) {
  //check if loadin data from api is required.
  //cached responses length should be > 0 and equal in length to current community object
  const isCompleted = getItemFromlocalStorage("memberDataCompleted")=="true"

  const dataFromApiRequired = isCompleted !== true ? true : false;

  const [dt, setData] = useState({ communityFetchStarted: false, userDetailsStarted: false });

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const membersDetails = getMembersFromlocalStorage();
      props.getDatafromMemory(membersDetails);
      setData({ userDetailsStarted: true, communityFetchStarted: true });
    };
    dataFromApiRequired === false && fetchDataFromLocalStorage();
  }, []);
  useEffect(() => {
    const fetchData = () => {
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
        const membersDetails = getMembersFromlocalStorage();

        const diff = props.filter.data.filter(
          (elem: userDetailInfo) =>
            !membersDetails.some((memberElem: userDetailInfo) => elem.id === memberElem.id)
        );

        props.fetchAllMembersDetails(diff);
        setData({ ...dt, userDetailsStarted: true });
      }
    };
    dataFromApiRequired === true && fetchUsers();
  });

  return Object.keys(props.filter.data).length > 0 ? (
    <Container>
      <Grid container sx={{ paddingTop: "20px" }} spacing={2}>
        <Grid item xs={12} sm={4}>
          <List />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MemberContainer />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RepositoryDetails />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Loader />
  );
};

export default connectToStore(View);
